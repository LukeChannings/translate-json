const { joinPath } = require("./translate")

describe("Translate", () => {
  describe("joinPath", () => {
    it("returns an empty string when passed an empty string", () => {
      expect(joinPath(null, "")).toBe("")
    })

    it("concatenates paths on a dot", () => {
      expect(joinPath("a.b.c", "d")).toBe("a.b.c.d")
    })
  })
})
