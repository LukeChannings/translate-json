const yandex = require("yandex-translate")
const google = require("google-translate-api")
const MsTranslator = require("mstranslator")
const Entities = require("html-entities").XmlEntities

const { encode, decode } = new Entities()

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
