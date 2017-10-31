const path = require("path")
const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))
const { STDIN, STDOUT } = require("./cli")
const { format } = require("util")
const { errors } = require("../strings.json")

const getInput = async source => {
  let input

  if (source === STDIN) {
    try {
      input = await getInputStdIn()
    } catch (ex) {
      throw new Error(errors.INVALID_STD_INPUT)
    }
  } else {
    try {
      input = await fs.readFileAsync(path.resolve(source), { encoding: "utf8" })
    } catch (ex) {
      throw new Error(format(errors.INVALID_INPUT, source))
    }
  }

  let json
  try {
    json = JSON.parse(input)
  } catch (error) {
    const friendlySourceName = source === STDIN ? "Standard Input" : source
    throw new Error(format(errors.INVALID_JSON_DOC, friendlySourceName))
  }

  return json
}

const getInputStdIn = () =>
  new Promise((resolve, reject) => {
    const { stdin } = process

    let buffer = ""

    stdin.on("readable", () => {
      const chunk = stdin.read()
      if (chunk !== null) buffer += chunk
    })

    stdin.on("error", error => reject(error))

    stdin.on("end", () => (buffer ? resolve(buffer) : reject()))
  })

const writeResult = async (result, destination) => {
  const prettyPrintedResult = JSON.stringify(result, null, 2)

  if (destination === STDOUT) {
    console.log(prettyPrintedResult)
  } else {
    try {
      await fs.writeFileAsync(prettyPrintedResult, { encoding: "utf8" })
    } catch (error) {
      throw error
    }
  }
}

module.exports = { getInput, getInputStdIn, writeResult }
