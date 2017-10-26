const yandex = require("yandex-translate")
const google = require("google-translate-api")
const MsTranslator = require("mstranslator")
const Entities = require("html-entities").XmlEntities

const { encode, decode } = new Entities()

var stripUntranslatableElements = str => {
  const tagName = /[a-zA-Z0-9]/.source
  const attributeName = /[^\s\u0000\u0022\u0027\u003e\u0025\u003d\u0000-\u001f\u007f-\u009f]+/
    .source
  const attributeValueEmpty = ""
  const attributeValueUnquoted = /(\s+)?\u003d(s+)?[^s\u0022\u0027\u003d\u003c\u003e\u0060]+/
    .source
  const attributeValue = `(${attributeValueEmpty}|${attributeValueUnquoted})`
  const startTag = `\u003c${tagName}+(\s+)((${attributeName}${attributeValue}(\s+)?)+)?`
  const endTag = `\u003c\u002f${tagName}(\s+)?\u003e`

  //return new RegExp(`(${startTag}|${endTag})`)
  return new RegExp(startTag, "g")
}

module.exports = {
  dryRun() {
    return value => Promise.resolve("zz_" + value)
  },

  google({ lang, preserveEntities }) {
    return value => {
      const valueWithDecodedEntities = decode(value)
      return google(valueWithDecodedEntities, { to: lang }).then(res => {
        const result = preserveEntities ? encode(res.text) : res.text
        return result
      })
    }
  },

  yandex({ apiKey, lang, preserveEntities }) {
    return value => {
      const processedValue = preserveEntities ? decode(value) : value
      return new Promise((resolve, reject) =>
        yandex(apiKey).translate(processedValue, { to: lang }, (err, res) => {
          const result = preserveEntities ? encode(res.text[0]) : res.text[0]
          return err ? reject(err) : resolve(result)
        })
      )
    }
  },

  bing({ apiKey, lang, preserveEntities }) {
    const translator = new MsTranslator({ api_key: apiKey }, true)

    return value => {
      return new Promise((resolve, reject) => {
        const text = preserveEntities ? decode(value) : value
        translator.translate({ to: lang, text }, (err, res) => {
          if (err) return reject(err)
          const result = preserveEntities ? encode(res) : res
          return resolve(result)
        })
      })
    }
  }
}
