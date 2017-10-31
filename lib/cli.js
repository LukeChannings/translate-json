const { format } = require("util")
const { usage, errors } = require("../strings.json")

const STDOUT = Symbol("stdout")
const STDIN = Symbol("stdin")

const getOptions = argv => {
  const options = {
    source: argv._ && argv._[0],
    destination: argv._ && argv._[1],
    lang: argv.language || argv.l,
    api: argv.translator || argv.t || "google",
    apiKey: argv["api-key"] || argv.k,
    exclude: argv.exclude || argv.e,
    dry: argv["dry-run"] || argv.d,
    concurrency: argv.concurrency || argv.c || 60,
    preserveEntities: argv["preserve-html-entities"] || argv.p || false,
    verbose: argv.verbose,
    help: argv.help || argv.h,
    version: argv.version || argv.v
  }

  if (!options.source) {
    throw new Error(errors.REQUIRED_PARAM_INPUT)
  }

  if (options.source === "-") {
    options.source = STDIN
  }

  if (!options.destination) {
    options.destination = STDOUT
  }

  if (!["google", "yandex", "bing"].includes(options.api)) {
    throw new Error(errors.INVALID_TRANSLATOR)
  }

  if (options.api !== "google" && !options.apiKey) {
    throw new Error(format(errors.REQUIRED_PARAM_API_KEY, options.api))
  }

  if (!options.lang) {
    throw new Error(errors.REQUIRED_PARAM_LANG)
  }

  if (!options.source && !options.destination && !options.version) {
    options.help = true
    return options
  }

  return options
}

module.exports = { STDOUT, STDIN, getOptions, usage }
