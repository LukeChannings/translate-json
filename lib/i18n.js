const locale = require("os-locale").sync();

const getLang = locale => locale.substr(0, 2);

let strings;
const lang = getLang(locale);

try {
  strings = require(`../locales/${lang}.json`);
} catch (error) {
  strings = require(`../locales/en.json`);
}

module.exports = strings;
