const transformers = require("./transformers.js")

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
    it("successfully translates a string", async () => {
      const value = "The quick brown fox ate the prawn crackers from the bin."
      const tr = transformers.google({ lang: "fr" })
      expect(await tr(value)).toBe(
        "Le renard brun rapide a mangé les craquelins de crevettes de la poubelle."
      )
    })

    it("preserves HTML entities correctly", async () => {
      const valueWithEntities = "Harold &amp; Kumar"
      const tr = transformers.google({ lang: "en", preserveEntities: true })
      expect(await tr(valueWithEntities)).toBe("Harold &amp; Kumar")
    })
  })
})
