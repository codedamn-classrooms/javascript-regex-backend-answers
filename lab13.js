const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(/\\*/.test(chewieRegex.source));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result[0][0] === 'A');`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result[0] === 'Aaaaaaaaaaaaaaaa');`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result[0].length === 16);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert(!"He made a fair move. Screaming about it can't help you.".match(chewieRegex));`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert(!"Let him have it. It's not wise to upset a Wookiee.".match(chewieRegex));`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
