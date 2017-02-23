const usage =
  [
    `Usage: ${require('../package.json').name} -l [language-code] -t [google|yandex] [input]`,
    '',
    '--language, --lang, -l :: The language to convert the document to. e.g. ru, ar, fr, etc.',
    '--translator, -t :: The translation servie to use. "google", or "yandex".',
    '--apiKey, --key, -k :: The API key to be used with the translation service.',
    '--exclude, --e :: Regular expression to exclude key paths. e.g. "^(notThis|this|not.this.either)$',
    '--input, -i, [last parameter] :: The JSON document to translate. ',
    '--output, -o :: Destination to write the translated JSON document.',
    '--help, -h :: This help message'
  ].join('\n')

const parseHelp = (argv) => (argv.help || argv.h) ? usage : false

const parseLanguage = (argv) =>
  argv.language || argv.lang || argv.l

const parseApiChoice = (argv) => {
  const api = argv.translator || argv.t
  const apiKey = argv.apiKey || argv.key || argv.k

  return {api, apiKey}
}

const parseSrcPath = (argv) =>
  (argv._ && argv._[0]) || argv.input || argv.i

const parseDestPath = (argv) =>
  (argv._ && argv._[1]) || argv.output || argv.o

const parseExcludes = (argv) =>
  argv.exclude || argv.e

const parseOptions = (argv) => {
  const language = parseLanguage(argv)
  const { api, apiKey } = parseApiChoice(argv)
  const srcPath = parseSrcPath(argv)
  const destPath = parseDestPath(argv)
  const exclude = parseExcludes(argv)

  if (!language) throw new Error('Language was not specified')
  if (!api) throw new Error('API type was not specified')
  if (!['google', 'yandex'].includes(api)) throw new Error(`${api} is not a supported API!`)
  if (api === 'yandex' && !apiKey) throw new Error('API key was not specified')
  if (!srcPath) throw new Error('Document source was not specified.')

  return {
    language,
    api,
    apiKey,
    exclude,
    srcPath,
    destPath
  }
}

module.exports = {
  parseLanguage,
  parseApiChoice,
  parseSrcPath,
  parseDestPath,
  parseHelp,
  usage,
  parseOptions
}
