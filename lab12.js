const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert(/\\+/.test(myRegex.source));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result.length == 2);`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(result[0] == 'ss' && result[1] == 'ss');`)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
