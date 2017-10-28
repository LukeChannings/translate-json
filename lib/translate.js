const { isPlainObject, set } = require("lodash")
const { map } = require("bluebird")
const { format } = require("util")

const { messages } = require("../strings.json")

const joinPath = (path, key) => (path ? path + "." : "") + key

const makeTranslationMarker = (value, path, transformFn) => ({
  tr: () => transformFn(value).then(result => [result, value]),
  value,
  path
})

const dedupeMarkers = markers => {
  const dedupedMarkers = new Map()

  let dupeCount = 0

  for (const { value, path, tr } of markers) {
    const existing = dedupedMarkers.get(value)

    if (existing) {
      dupeCount += 1
      existing.paths.push(path)
    } else {
      dedupedMarkers.set(value, {
        tr,
        paths: [path]
      })
    }
  }

  return {
    dupeCount,
    dedupedMarkers
  }
}

async function translateDeep({
  doc,
  transforms = [],
  options: { verbose, concurrency }
}) {
  const trMarkers = []

  function recurse(cursor, path) {
    for (const { test, transform } of transforms) {
      if (
        test({
          cursor,
          path
        })
      ) {
        const marker = makeTranslationMarker(cursor, path, transform)

        trMarkers.push(marker)

        return marker
      }
    }

    if (Array.isArray(cursor) || isPlainObject(cursor)) {
      const accum = Array.isArray(cursor) ? [] : {}

      for (let [key, value] of Object.entries(cursor)) {
        accum[key] = recurse(value, joinPath(path, key))
      }

      return accum
    }

    return cursor
  }

  const clone = recurse(doc)

  const { dedupedMarkers, dupeCount } = dedupeMarkers(trMarkers)
  const translations = await map(dedupedMarkers.values(), ({ tr }) => tr(), {
    concurrency
  })

  if (verbose) console.info(format(messages.TRANSLATING, trMarkers.length))
  if (verbose) console.info(format(messages.DUPLICATE_COUNT, dupeCount))

  for (const [translatedValue, value] of await translations) {
    const { paths } = dedupedMarkers.get(value)

    for (const path of paths) {
      set(clone, path, translatedValue)
    }
  }

  return clone
}

module.exports = {
  joinPath,
  translateDeep,
  makeTranslationMarker,
  dedupeMarkers
}
