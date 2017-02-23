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

async function main ({help, srcPath, destPath, api, apiKey, language, exclude, verbose}) {
  if (help) {
    console.log(cli.usage.join('\n'))
    return process.exit(0)
  }

  const doc = require(path.resolve(process.cwd(), srcPath))

  const transform =
    api
      ? transformers[api]
      : transformers.dryRun

  const tr = transform(apiKey, language)

  const test = ({cursor, path}) =>
    typeof cursor === 'string' &&
    (exclude
      ? !(new RegExp(exclude, 'i')).test(path)
      : true)

  const transforms = [
    {test, transform: tr}
  ]

  const translatedDoc = await translateDeep({doc, transforms, verbose})
  const serializedDoc = JSON.stringify(translatedDoc, null, 2)

  if (destPath) {
    fs.writeFileSync(path.resolve(process.cwd(), destPath), serializedDoc)
    return format(messages.SUCCESS, destPath)
  } else {
    return serializedDoc
  }
}
