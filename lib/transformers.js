const YandexTranslator = require("yandex.translate")
const googleTranslate = require("google-translate-api")
const MsTranslator = require("mstranslator")
const Entities = require("html-entities").XmlEntities

const { encode, decode } = new Entities()

const required = param => {
  throw new Error("Missing required parameter: " + param)
}

const dryRun = () => async value => "zz_" + value

const google = ({
  lang = required("lang"),
  preserveEntities
}) => async value => {
  const valueWithDecodedEntities = decode(value)
  const res = await googleTranslate(valueWithDecodedEntities, {
    to: lang
  })
  return preserveEntities ? encode(res.text) : res.text
}

const yandex = ({
  apiKey = required("apiKey"),
  lang = required("lang"),
  preserveEntities
}) => async value => {
  const processedValue = preserveEntities ? decode(value) : value
  const translator = new YandexTranslator(apiKey)

  try {
    const [text] = await translator.translate(processedValue, lang)
    return preserveEntities ? encode(text) : text
  } catch (error) {
    throw error
  }
}

const bing = ({ apiKey, lang, preserveEntities }) => {
  const translator = new MsTranslator(
    {
      api_key: apiKey
    },
    true
  )

  const tr = Promise.promisify(translator.translate)

  return async value => {
    const text = preserveEntities ? decode(value) : value
    try {
      const res = await tr({ to: lang, text })
      const result = preserveEntities ? encode(res) : res
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = { dryRun, google, yandex, bing }
