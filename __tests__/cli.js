/* eslint-env jest */

const minimist = require('minimist')

const {
  getOptions
} = require('../lib/cli')

describe('command line interface', () => {
  describe('language arguments', () => {
    it('-l ru input', () => {
      const m = minimist('-l ru input'.split(' '))
      expect(getOptions(m).language).toBe('ru')
    })
    it('-l gb input', () => {
      const m = minimist('-l gb input'.split(' '))
      expect(getOptions(m).language).toBe('gb')
    })
    it('-l ie input', () => {
      const m = minimist('-l ie input'.split(' '))
      expect(getOptions(m).language).toBe('ie')
    })
  })

  describe('api arguments', () => {
    it('defaults', () => {
      const m = minimist('-l foo input'.split(' '))
      const {api, apiKey} = getOptions(m)
      expect(api).toEqual('google')
      expect(apiKey).toEqual(undefined)
    })
    it('--translator yandex --apiKey abc123', () => {
      const m = minimist('-l foo input --translator yandex --apiKey abc123'.split(' '))
      const {api, apiKey} = getOptions(m)
      expect(api).toEqual('yandex')
      expect(apiKey).toEqual('abc123')
    })
    it('--t yandex --key def456', () => {
      const m = minimist('-l foo input --t yandex --key def456'.split(' '))
      const {api, apiKey} = getOptions(m)
      expect(api).toEqual('yandex')
      expect(apiKey).toEqual('def456')
    })
  })
})
