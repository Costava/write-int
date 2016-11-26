var test = require('tape');

var writeInt = require('../dist/writeInt.js');

test('Bad arguments', function(assert) {
	assert.equal(writeInt(), null);
	assert.equal(writeInt(null), null);
	assert.equal(writeInt("a"), null);
	assert.equal(writeInt("asdf"), null);
	assert.equal(writeInt({}), null);
	assert.equal(writeInt(Math), null);

	// Number instance not accepted
	assert.equal(writeInt(new Number(5)), null);

	// String instance not accepted (string primitives are)
	assert.equal(writeInt(new String("5")), null);

	assert.equal(writeInt(5, {lang: "foobar"}), null);// unsupported language
	assert.equal(writeInt(5, {lang: "xx"}), null);// unsupported language
	assert.equal(writeInt("jk"), null);
	assert.equal(writeInt("qwerty", {lang: "zz"}), null);

	assert.end();
});
