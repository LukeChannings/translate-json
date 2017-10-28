/* eslint-env jest */

const minimist = require("minimist")

const { getOptions } = require("./cli")
const { errors } = require("../strings.json")

describe("command line interface", () => {
  describe("language arguments", () => {
    it("-l ru input", () => {
      const m = minimist("-l ru input".split(" "))
      expect(getOptions(m).lang).toBe("ru")
    })
    it("-l gb input", () => {
      const m = minimist("-l gb input".split(" "))
      expect(getOptions(m).lang).toBe("gb")
    })
    it("-l ie input", () => {
      const m = minimist("-l ie input".split(" "))
      expect(getOptions(m).lang).toBe("ie")
    })
  })

  describe("api arguments", () => {
    it("defaults to google", () => {
      const m = minimist("-l foo input".split(" "))
      const { api, apiKey } = getOptions(m)
      expect(api).toEqual("google")
      expect(apiKey).toBeUndefined()
    })
    it("--translator yandex --api-key abc123", () => {
      const m = minimist(
        "-l foo input --translator yandex --api-key abc123".split(" ")
      )
      const { api, apiKey } = getOptions(m)
      expect(api).toEqual("yandex")
      expect(apiKey).toEqual("abc123")
    })
    it("--t yandex -k def456", () => {
      const m = minimist("-l foo input --t yandex -k def456".split(" "))
      const { api, apiKey } = getOptions(m)
      expect(api).toEqual("yandex")
      expect(apiKey).toEqual("def456")
    })
  })

  it("throws an error when an invalid language is passed.", () => {
    const m = minimist("-t abc".split(" "))

    expect(() => getOptions(m)).toThrow(errors.INVALID_TRANSLATOR)
  })

  it("throws an error when Bing is chosen as a translator but no API key is provided", () => {
    const m = minimist("-t bing".split(" "))
    expect(() => getOptions(m)).toThrow(
      errors.REQUIRED_PARAM_API_KEY.replace("%s", "bing")
    )
  })

  it("throws an error when Yandex is chosen as a translator but no API key is provided", () => {
    const m = minimist("-t yandex".split(" "))
    expect(() => getOptions(m)).toThrow(
      errors.REQUIRED_PARAM_API_KEY.replace("%s", "yandex")
    )
  })

  it("Google translator does not require an API key", () => {
    const m = minimist("-t google".split(" "))
    const opts = getOptions(m)
    expect(opts.api).toEqual("google")
    expect(opts.apiKey).toBeUndefined()
  })

  it("defaults to help when nothing is passed", () => {
    const m = minimist("")
    const opts = getOptions(m)
    expect(opts.help).toBe(true)
  })
})
