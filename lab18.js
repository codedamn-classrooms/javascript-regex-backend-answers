const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(alphabetRegexV2.global);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(/\\\\w/.test(alphabetRegexV2.source));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("The five boxing wizards jump quickly.".match(alphabetRegexV2).length === 31);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("Pack my box with five dozen liquor jugs.".match(alphabetRegexV2).length === 32);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("How vexingly quick daft zebras jump!".match(alphabetRegexV2).length === 30);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("123 456 7890 ABC def GHI jkl MNO pqr STU vwx YZ.".match(alphabetRegexV2).length === 36);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
