#!/usr/bin/env node --harmony-async-await

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
  const doc = require(options.srcPath)

  const transform =
    options.api
      ? transformers[options.api]
      : transformers.dryRun

  const tr = transform(options.apiKey, options.language)
  const test = (a) =>
    typeof a === 'string' &&
    !(new RegExp(argv.excludeProperties, 'i')).test(a)

  translateDeep({
    doc,
    transforms: [ { test, transform: tr } ]
  }).then((translatedDoc) => console.log(JSON.stringify(translatedDoc, null, 2)))
} catch (error) {
  console.error(`Bad parameters. ${error}\n\n`)
  console.log(cli.usage)
}

