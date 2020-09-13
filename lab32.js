const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(code.match(/\\.replace\\(.*\\)/));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result === "three two one");`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(code.match(/result\\s*=\\s*str\\.replace\\(.*?\\)/));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert((new RegExp(fixRegex.source + '|')).exec('').length - 1 >= 3);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`{ const re = /(\\$\\d{1,2})+(?:[\\D]|\\b)/g; assert(replaceText.match(re).length >= 3); }`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
