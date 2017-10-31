const os = require("os")
const { red } = require("colors")

const { getOptions, usage, STDIN, STDOUT } = require("./cli")
const { getInput, writeResult } = require("./io")
const { translateDeep } = require("./translate")
const transformers = require("./transformers")
const { messages, errors } = require("../strings.json")

// entrypoint
;(async function main() {
  const opts = getOptions()

  if (opts.version) return require("./package.json").version
  if (opts.help) return usage.join(os.EOL)

  const doc = await getInput(opts.source)

  const transform =
    opts.api && !opts.dry ? transformers[opts.api] : transformers.dryRun

  if (opts.verbose) console.info(messages.TRANSFORMER_CHOICE, opts.api)

  const tr = transform(opts)

  const test = ({ cursor, path }) =>
    typeof cursor === "string" &&
    (opts.exclude ? !new RegExp(opts.exclude, "i").test(path) : true) &&
    (opts.include ? new RegExp(opts.include, "i").test(path) : true)

  const transforms = [
    {
      test,
      transform: tr
    }
  ]

  const translatedDoc = await translateDeep({
    doc,
    transforms,
    options: opts
  })

  const serializedDoc = JSON.stringify(translatedDoc, null, 2).replace(
    /\n/g,
    os.EOL
  )

  await writeResult(translatedDoc, opts.destination)
})().catch(({ message }) =>
  console.error([red("Error: " + message), os.EOL, ...usage].join(os.EOL))
)
