const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(lastRegex.source == "caboose$");`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(lastRegex.flags == "");`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(lastRegex.test("The last car on a train is the caboose"));`)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
