const yandex = require('yandex-translate')
const google = require('google-translate-api')
const Entities = require('html-entities').XmlEntities

const {encode, decode} = new Entities()

module.exports = {
  dryRun (apiKey, lang) {
    return (value) => Promise.resolve('zz_' + value)
  },

  google (apiKey, lang) {
    return (value) => google(decode(value), {to: lang}).then((res) => encode(res.text))
  },

  yandex (apiKey, lang) {
    return (value) => {
      return new Promise((resolve, reject) =>
        yandex(apiKey).translate(
          decode(value),
          {to: lang},
          (err, res) => err ? reject(err) : resolve(encode(res.text[0])))
        )
    }
  }
}
