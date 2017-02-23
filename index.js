#!/usr/bin/env node --harmony-async-await

const path = require('path')
const cli = require('./lib/cli')
const { translateDeep } = require('./lib/translate')
const transformers = require('./lib/transformers')

const argv = require('minimist')(process.argv.slice(2))

try {
  const help = cli.parseHelp(argv)

  if (help) {
    console.log(help)
    process.exit(0)
  }

  const options = cli.parseOptions(argv)
  const doc = require(path.resolve(process.cwd(), options.srcPath))

  const transform =
    options.api
      ? transformers[options.api]
      : transformers.dryRun

  const tr = transform(options.apiKey, options.language)
  const test = ({cursor, path}) =>
    typeof cursor === 'string' &&
    (options.exclude
      ? !(new RegExp(options.exclude, 'i')).test(path)
      : true)

  translateDeep({
    doc,
    transforms: [ { test, transform: tr } ]
  }).then((translatedDoc) => {
    const serializedDoc = JSON.stringify(translatedDoc, null, 2)
    if (options.output) {
      fs.writeFileSync(options.output, serializedDoc)
    } else {
      console.log(serializedDoc)
    }
  })
} catch (error) {
  console.error(`Bad parameters. ${error}\n\n`)
  console.log(cli.usage)
}

