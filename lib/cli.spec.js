/* eslint-env jest */

const minimist = require("minimist")

const { getOptions } = require("../lib/cli")

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
})
