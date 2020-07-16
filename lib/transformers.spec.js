const transformers = require("./transformers")

describe("transformers", () => {
  describe("dry run", () => {
    it("prepends zz_ to all strings", async () => {
      const value = "foo"
      const tr = transformers.dryRun()
      const output = await tr(value)
      expect(output).toBe("zz_foo")
    })
  })

  describe("google", () => {
    it("requires an lang parameter", () => {
      expect(() => transformers.google({})).toThrow(
        "Missing required parameter: lang"
      )
    })

    it("successfully translates a string", async () => {
      const value = "The quick brown fox ate the prawn crackers from the bin."
      const tr = transformers.google({
        lang: "fr",
      })
      expect(await tr(value)).toBe(
        "Le renard brun rapide a mangé les craquelins de crevettes de la poubelle."
      )
    })

    it("preserves HTML entities correctly", async () => {
      const valueWithEntities = "Harold &amp; &quot;Kumar&quot;"
      const tr = transformers.google({
        lang: "en",
        preserveEntities: true,
      })
      expect(await tr(valueWithEntities)).toBe(valueWithEntities)
    })

    it("passes through HTML entities by default", async () => {
      const valueWithEntities = "Harold &amp; &quot;Kumar&quot;"
      const tr = transformers.google({ lang: "en" })
      expect(await tr(valueWithEntities)).toBe('Harold & "Kumar"')
    })
  })

  describe("yandex", () => {
    const apiKey = process.env.YANDEX_API_KEY

    it("requires an lang parameter", () => {
      expect(() => transformers.yandex({ apiKey: "abc123" })).toThrow(
        "Missing required parameter: lang"
      )
    })
    it("requires an apiKey parameter", () => {
      expect(() => transformers.yandex({ lang: "fr" })).toThrow(
        "Missing required parameter: apiKey"
      )
    })
    it("translates some text", async () => {
      const value = "Have you ever been to the space station?"
      const tr = transformers.yandex({ apiKey, lang: "ru" })
      expect(await tr(value)).toBe(
        "Вы когда-нибудь были на космической станции?"
      )
    })

    it("preserves HTML entities correctly", async () => {
      const valueWithEntities = "Harold &amp; &quot;Kumar&quot;"
      const tr = transformers.yandex({
        apiKey,
        lang: "en",
        preserveEntities: true,
      })
      expect(await tr(valueWithEntities)).toBe(valueWithEntities)
    })

    it("errors correctly with too much text", async () => {
      const value = Array(10e4).fill("lorem").join("")
      const tr = transformers.yandex({
        apiKey,
        lang: "en",
      })
      expect(tr(value)).rejects.toEqual(expect.any(Error))
    })
  })

  describe("bing", () => {
    const apiKey = process.env.BING_API_KEY

    it("requires an lang parameter", () => {
      expect(() => transformers.bing({ apiKey: "abc123" })).toThrow(
        "Missing required parameter: lang"
      )
    })
    it("requires an apiKey parameter", () => {
      expect(() => transformers.bing({ lang: "fr" })).toThrow(
        "Missing required parameter: apiKey"
      )
    })
    it("translates some text", async () => {
      const value = "Have you ever been to the space station?"
      const tr = transformers.bing({ apiKey, lang: "ru" })
      expect(await tr(value)).toBe(
        "Вы когда-нибудь были на космической станции?"
      )
    })

    it("preserves HTML entities correctly", async () => {
      const valueWithEntities = "Harold &amp; &quot;Kumar&quot;"
      const tr = transformers.bing({
        apiKey,
        lang: "en",
        preserveEntities: true,
      })
      expect(await tr(valueWithEntities)).toBe(valueWithEntities)
    })

    it("errors correctly with too much text", async () => {
      const value = Array(10e4).fill("lorem").join("")
      const tr = transformers.bing({
        apiKey,
        lang: "en",
      })
      expect(tr(value)).rejects.toEqual(expect.any(Error))
    })
  })
})
