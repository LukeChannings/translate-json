#!/usr/bin/env node --harmony-async-await

const path = require('path')
const fs = require('fs')
const {format} = require('util')

const cli = require('./lib/cli')
const { translateDeep } = require('./lib/translate')
const transformers = require('./lib/transformers')
const {messages} = require('./strings.json')

const argv = require('minimist')(process.argv.slice(2))

try {
  main(cli.getOptions(argv))
    .then(console.log)
} catch (error) {
  console.error([error, '\n', ...cli.usage].join('\n'))
}

async function main (opts) {
  if (opts.help) {
    console.log(cli.usage.join('\n'))
    return process.exit(0)
  }

  const doc = require(path.resolve(process.cwd(), opts.srcPath))

  const transform =
    opts.api && !opts.dry
      ? transformers[opts.api]
      : transformers.dryRun

  const tr = transform(opts.apiKey, opts.language)

  const test = ({cursor, path}) =>
    typeof cursor === 'string' &&
    (opts.exclude
      ? !(new RegExp(opts.exclude, 'i')).test(path)
      : true)

  const transforms = [
    {test, transform: tr}
  ]

  const translatedDoc = await translateDeep({doc, transforms, options: opts})
  const serializedDoc = JSON.stringify(translatedDoc, null, 2)

  if (opts.destPath) {
    fs.writeFileSync(path.resolve(process.cwd(), opts.destPath), serializedDoc)
    return format(messages.SUCCESS, opts.destPath)
  } else {
    return serializedDoc
  }
}
