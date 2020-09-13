const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(nonAlphabetRegex.global);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("The five boxing wizards jump quickly.".match(nonAlphabetRegex).length == 6);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(/\\\\W/.test(nonAlphabetRegex.source));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("Pack my box with five dozen liquor jugs.".match(nonAlphabetRegex).length == 8);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("How vexingly quick daft zebras jump!".match(nonAlphabetRegex).length == 6);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("123 456 7890 ABC def GHI jkl MNO pqr STU vwx YZ.".match(nonAlphabetRegex).length == 12);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
