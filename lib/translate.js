const { isPlainObject } = require('lodash')

const joinPath = (path, key) => (path ? path + '.' : '') + key

async function translateDeep ({doc = {}, transforms = []}) {
  const cache = {}

  async function recurse (cursor, path) {
    for (const {test, transform} of transforms) {
      if (test(cursor, path)) {
        const translatedValue = cache[cursor] || await transform(cursor)
        cache[cursor] = translatedValue
        return translatedValue
      }
    }

    if (Array.isArray(cursor) || isPlainObject(cursor)) {
      const accum = Array.isArray(cursor) ? [] : {}

      for (let [key, value] of Object.entries(cursor)) {
        const item = await recurse(value, joinPath(path, key))
        accum[key] = item
      }

      return accum
    }

    return cursor
  }

  return await recurse(doc)
}

module.exports = {
  joinPath,
  translateDeep
}
