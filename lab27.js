const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(timRegex.source.match(/{.*?}/).length > 0);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `timRegex.lastIndex = 0; assert(!timRegex.test("Timber"));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `timRegex.lastIndex = 0; assert(!timRegex.test("Timmber"));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `timRegex.lastIndex = 0; assert(!timRegex.test("Timmmber"));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `timRegex.lastIndex = 0; assert(timRegex.test("Timmmmber"));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`timRegex.lastIndex = 0; assert(!timRegex.test("Ti" + "m".repeat(30) + "ber"));`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
