// @ts-ignore
import Provider from "./provider-example"

const numbers = new Provider<number>("numbers")
const strings = new Provider<string>("strings")

test("set number", (done) => {
  numbers
    .set("one", 1)
    .then(() => done())
    .catch(done)
})
