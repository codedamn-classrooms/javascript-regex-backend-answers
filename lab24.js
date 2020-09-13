const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(countNonWhiteSpace.global);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(/\\\\S/.test(countNonWhiteSpace.source));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert("Men are from Mars and women are from Venus.".match(countNonWhiteSpace).length == 35);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code + '\n' + `assert("Space: the final frontier.".match(countNonWhiteSpace).length == 23);`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert("MindYourPersonalSpace".match(countNonWhiteSpace).length == 21);`)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
