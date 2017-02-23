const yandex = require('yandex-translate')
const google = require('google-translate-api')
const Entities = require('html-entities').XmlEntities

const {encode, decode} = new Entities()

module.exports = {
  dryRun (apiKey, lang) {
    return (value) => Promise.resolve('zz_' + value)
  },

  google (apiKey, lang, preserveEntities) {
    return (value) => {
      const processedValue = preserveEntities ? decode(value) : value
      return google(processedValue, {to: lang}).then((res) => {
        const result = preserveEntities ? encode(res.text) : res.text
        return result
      })
    }
  },

  yandex (apiKey, lang, preserveEntities) {
    return (value) => {
      const processedValue = preserveEntities ? decode(value) : value
      return new Promise((resolve, reject) =>
        yandex(apiKey).translate(
          processedValue,
          {to: lang},
          (err, res) => {
            const result = preserveEntities ? encode(res.text[0]) : res.text[0]
            return err ? reject(err) : resolve(result)
          })
        )
    }
  }
}
