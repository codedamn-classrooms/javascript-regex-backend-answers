const fs = require('fs')
const assert = require('assert')
const path = require('path')
const code = fs.readFileSync(path.resolve(process.env.USER_CODE_DIR, 'index.js'), 'utf8')

const results = []

try {
	eval(code + '\n' + `assert('C'.match(reCriminals) && 'C'.match(reCriminals)[0] == 'C');`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert('CC'.match(reCriminals) && 'CC'.match(reCriminals)[0] == 'CC');`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert('P1P5P4CCCP2P6P3'.match(reCriminals) && 'P1P5P4CCCP2P6P3'.match(reCriminals)[0] == 'CCC');`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert('P6P2P7P4P5CCCCCP3P1'.match(reCriminals) && 'P6P2P7P4P5CCCCCP3P1'.match(reCriminals)[0] == 'CCCCC');`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(!reCriminals.test(''));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(code + '\n' + `assert(!reCriminals.test('P1P2P3'));`)
	results.push(true)
} catch (error) {
	results.push(false)
}
try {
	eval(
		code +
			'\n' +
			`assert('P2P1P5P4CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCP3'.match(reCriminals) && 'P2P1P5P4CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCP3'.match(reCriminals)[0] == "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");`
	)
	results.push(true)
} catch (error) {
	results.push(false)
}

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
