const {format} = require('util')
const {usage, errors} = require('../strings.json')

const getOptions = (argv) => {
  const options = {
    language: argv.language || argv.l,
    api: argv.translator || argv.t || 'google',
    apiKey: argv['api-key'] || argv.k,
    exclude: argv.exclude || argv.e,
    srcPath: (argv._ && argv._[0]),
    destPath: (argv._ && argv._[1]),
    dry: argv['dry-run'] || argv.d,
    concurrency: argv.concurrency || argv.c || 60,
    preserveHtmlEntities: argv['preserve-html-entities'] || argv.p || false,
    verbose: argv.verbose,
    help: argv.help || argv.h,
    version: argv.version || argv.v
  }

  if (options.help || options.version) {
    return options
  }

  if (!options.language) {
    throw new Error(errors.REQUIRED_PARAM_LANG)
  }

  if (!['google', 'yandex', 'bing'].includes(options.api)) {
    throw new Error(errors.INVALID_TRANSLATOR)
  }

  if (options.api !== 'google' && !options.apiKey) {
    throw new Error(format(errors.REQUIRED_PARAM_API_KEY, options.api))
  }

  return options
}

module.exports = {getOptions, usage}
