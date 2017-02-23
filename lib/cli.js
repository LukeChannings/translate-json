const {usage, errors} = require('../strings.json')

const getOptions = (argv) => {
  const options = {
    language: argv.language || argv.lang || argv.l,
    api: argv.translator || argv.t || 'google',
    apiKey: argv.apiKey || argv.key || argv.k,
    exclude: argv.exclude || argv.e,
    srcPath: (argv._ && argv._[0]) || argv.input || argv.i,
    destPath: (argv._ && argv._[1]) || argv.output || argv.o,
    dry: argv.dryRun || argv.dry || argv.d,
    concurrency: argv.concurrency || argv.c || 60,
    preserveHtmlEntities: argv.preserveHtmlEntities || argv.preserve || argv.p || false,
    verbose: argv.verbose || argv.debug,
    help: argv.help || argv.h,
    version: argv.version || argv.v
  }

  if (options.help || options.version) {
    return options
  }

  if (!options.language) {
    throw new Error(errors.REQUIRED_PARAM_LANG)
  }

  if (!['google', 'yandex'].includes(options.api)) {
    throw new Error(errors.INVALID_TRANSLATOR)
  }

  if (options.api !== 'google' && !options.apiKey) {
    throw new Error(errors.REQUIRED_PARAM_API_KEY_WITH_YANDEX)
  }

  if (!options.srcPath) {
    throw new Error(errors.REQUIRED_PARAM_INPUT)
  }

  return options
}

module.exports = {getOptions, usage}
