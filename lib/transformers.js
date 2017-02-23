const yandex = require('yandex-translate')
const google = require('google-translate-api')

module.exports = {
  dryRun (apiKey, lang) {
    return (value) => Promise.resolve('zz_' + value)
  },
  google (apiKey, lang) {
    return (value) => google(value, {to: lang}).then((res) => res.text)
  },
  yandex (apiKey, lang) {
    return (value) => {
      return new Promise((resolve, reject) =>
        yandex(apiKey).translate(
          value,
          {to: lang},
          (err, res) => err ? reject(err) : resolve(res.text[0]))
        )
    }
  }
}
