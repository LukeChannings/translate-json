/* eslint-env jest */

const minimist = require('minimist')

const {
  getLanguage,
  getApiChoice
} = require('../lib/cli')

describe('command line interface', () => {
  describe('language arguments', () => {
    it('-l ru', () => {
      const m = minimist(['-l', 'ru'])
      expect(getLanguage(m)).toBe('ru')
    })
    it('--lang gb', () => {
      const m = minimist(['--lang', 'gb'])
      expect(getLanguage(m)).toBe('gb')
    })
    it('--language ie', () => {
      const m = minimist(['--language', 'ie'])
      expect(getLanguage(m)).toBe('ie')
    })
  })

  describe('api arguments', () => {
    it('--translator yandex --apiKey abc123', () => {
      const m = minimist('--translator yandex --apiKey abc123'.split(' '))
      expect(getApiChoice(m)).toEqual({api: 'yandex', 'apiKey': 'abc123'})
    })
    it('--t yandex --key def456', () => {
      const m = minimist('--t yandex --key def456'.split(' '))
      expect(getApiChoice(m)).toEqual({api: 'yandex', 'apiKey': 'def456'})
    })
  })
})
