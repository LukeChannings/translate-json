const YandexTranslator = require("yandex.translate")
const googleTranslate = require("@k3rn31p4nic/google-translate-api")
const MsTranslator = require("mstranslator")
const Entities = require("html-entities").XmlEntities

const { encode, decode } = new Entities()

class TranslationError extends Error {}

const required = param => {
  throw new Error("Missing required parameter: " + param)
}

const dryRun = () => async value => "zz_" + value

const google = ({
  lang = required("lang"),
  preserveEntities
}) => async value => {
  const valueWithDecodedEntities = decode(value)
  try {
    const res = await googleTranslate(valueWithDecodedEntities, { to: lang })
    return preserveEntities ? encode(res.text) : res.text
  } catch (err) {
    throw new TranslationError("Google failed to translate a string. " + err.message)
  }
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
  } catch (err) {
    throw new TranslationError("Yandex failed to translate a string. " + err.message)
  }
}

const bing = ({
  apiKey = required("apiKey"),
  lang = required("lang"),
  preserveEntities
}) => async value => {
  const translator = new MsTranslator(
    {
      api_key: apiKey
    },
    true
  )

  try {
    const text = await (new Promise((resolve, reject) => {
      const text = preserveEntities ? decode(value) : value
      translator.translate({ text, to: lang }, (err, result) => {
        const translatedText = preserveEntities ? encode(result) : result
        if (err) return reject(err)
        else return resolve(translatedText)
      })
    }))
    return text
  } catch (err) {
    throw new TranslationError("Bing failed to translate a string. " + err.message)
  }
}

module.exports = { dryRun, google, yandex, bing }
