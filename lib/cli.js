const {usage, errors} = require('../strings.json')

const getHelp = (argv) => argv.help || argv.h

const getLanguage = (argv) =>
  argv.language || argv.lang || argv.l

const getApiChoice = (argv) => {
  const api = argv.translator || argv.t || 'google'
  const apiKey = argv.apiKey || argv.key || argv.k

  return {api, apiKey}
}

const getSrcPath = (argv) =>
  (argv._ && argv._[0]) || argv.input || argv.i

const getDestPath = (argv) =>
  (argv._ && argv._[1]) || argv.output || argv.o

const getExcludes = (argv) =>
  argv.exclude || argv.e

const getVerbose = (argv) =>
  argv.verbose || argv.debug

const getOptions = (argv) => {
  const language = getLanguage(argv)
  const { api, apiKey } = getApiChoice(argv)
  const srcPath = getSrcPath(argv)
  const destPath = getDestPath(argv)
  const exclude = getExcludes(argv)
  const help = getHelp(argv)
  const verbose = getVerbose(argv)

  if (help) return {help}

  if (!language) {
    throw new Error(errors.REQUIRED_PARAM_LANG)
  }

  if (!['google', 'yandex'].includes(api)) {
    throw new Error(errors.INVALID_TRANSLATOR)
  }

  if (api !== 'google' && !apiKey) {
    throw new Error(errors.REQUIRED_PARAM_API_KEY_WITH_YANDEX)
  }

  if (!srcPath) {
    throw new Error(errors.REQUIRED_PARAM_INPUT)
  }

  return {language, api, apiKey, exclude, srcPath, destPath, verbose}
}

module.exports = {
  getLanguage,
  getApiChoice,
  getSrcPath,
  getDestPath,
  getHelp,
  getOptions,
  usage
}
