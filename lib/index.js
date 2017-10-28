const os = require("os")
const path = require("path")
const fs = require("fs")
const { format } = require("util")

const cli = require("./cli")
const { translateDeep } = require("./translate")
const transformers = require("./transformers")
const { messages, errors } = require("../strings.json")

const argv = require("minimist")(process.argv.slice(2))

try {
  main(cli.getOptions(argv))
    .then(console.log)
    .catch(console.error)
} catch (error) {
  console.error([error, os.EOL, ...cli.usage].join(os.EOL))
}

async function main(opts) {
  if (opts.version) return require("./package.json").version
  if (opts.help) return cli.usage.join(os.EOL)

  const doc = await getInput(opts.srcPath)

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

  if (opts.destPath) {
    fs.writeFileSync(path.resolve(process.cwd(), opts.destPath), serializedDoc)
    return format(messages.SUCCESS, opts.destPath)
  } else {
    return serializedDoc
  }
}

function getInput(srcPath) {
  if (srcPath) {
    const doc = require(path.resolve(process.cwd(), srcPath))
    return Promise.resolve(doc)
  } else {
    return new Promise((resolve, reject) => {
      let doc = ""

      process.stdin.setEncoding("utf8")

      process.stdin.on("readable", () => {
        const chunk = process.stdin.read()
        if (chunk !== null) doc += chunk
      })

      process.stdin.on("end", () => {
        try {
          const jsonDoc = JSON.parse(doc)
          return resolve(jsonDoc)
        } catch (error) {
          return reject(errors.INVALID_STD_INPUT)
        }
      })
    })
  }
}
