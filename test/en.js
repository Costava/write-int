var test = require('tape');

var writeInt = require('../dist/writeInt.js');

test('en: 0 through 10', function(assert) {
	assert.equal(writeInt(0), 'zero');
	assert.equal(writeInt(1), 'one');
	assert.equal(writeInt(2), 'two');
	assert.equal(writeInt(3), 'three');
	assert.equal(writeInt(4), 'four');
	assert.equal(writeInt(5), 'five');
	assert.equal(writeInt(6), 'six');
	assert.equal(writeInt(7), 'seven');
	assert.equal(writeInt(8), 'eight');
	assert.equal(writeInt(9), 'nine');
	assert.equal(writeInt(10), 'ten');

	assert.end();
});

test('en: 11 through 20', function(assert) {
	assert.equal(writeInt(11), 'eleven');
	assert.equal(writeInt(12), 'twelve');
	assert.equal(writeInt(13), 'thirteen');
	assert.equal(writeInt(14), 'fourteen');
	assert.equal(writeInt(15), 'fifteen');
	assert.equal(writeInt(16), 'sixteen');
	assert.equal(writeInt(17), 'seventeen');
	assert.equal(writeInt(18), 'eighteen');
	assert.equal(writeInt(19), 'nineteen');
	assert.equal(writeInt(20), 'twenty');

	assert.end();
});

test('en: more', function(assert) {
	assert.equal(writeInt(24), 'twenty-four');
	assert.equal(writeInt(40), 'forty');
	assert.equal(writeInt(93), 'ninety-three');
	assert.equal(writeInt(99), 'ninety-nine');
	assert.equal(writeInt(100), 'one hundred');
	assert.equal(writeInt(101), 'one hundred and one');
	assert.equal(writeInt(123), 'one hundred and twenty-three');
	assert.equal(writeInt(253), 'two hundred and fifty-three');
	assert.equal(writeInt(1000), 'one thousand');
	assert.equal(writeInt(1000000), 'one million');
	assert.equal(writeInt(1000001), 'one million and one');
	assert.equal(writeInt(2000734), 'two million seven hundred and thirty-four');
	assert.equal(writeInt(3000000000), 'three billion');
	assert.equal(writeInt(5000000001000), 'five trillion one thousand');
	assert.equal(writeInt(6000000000100), 'six trillion one hundred');
	assert.equal(writeInt(7000000000010), 'seven trillion and ten');
	assert.equal(writeInt(8000000000001), 'eight trillion and one');
	assert.equal(writeInt(9000000000000), 'nine trillion');

	assert.end();
});

test('en: negative', function(assert) {
	assert.equal(writeInt(-24), 'negative twenty-four');
	assert.equal(writeInt(-40), 'negative forty');
	assert.equal(writeInt(-93), 'negative ninety-three');
	assert.equal(writeInt(-99), 'negative ninety-nine');
	assert.equal(writeInt(-100), 'negative one hundred');
	assert.equal(writeInt(-101), 'negative one hundred and one');
	assert.equal(writeInt(-253), 'negative two hundred and fifty-three');
	assert.equal(writeInt(-1000), 'negative one thousand');
	assert.equal(writeInt(-1000000), 'negative one million');
	assert.equal(writeInt(-1000001), 'negative one million and one');
	assert.equal(writeInt(-2000734), 'negative two million seven hundred and thirty-four');
	assert.equal(writeInt(-3000000000), 'negative three billion');
	assert.equal(writeInt(-5000000001000), 'negative five trillion one thousand');
	assert.equal(writeInt(-6000000000100), 'negative six trillion one hundred');
	assert.equal(writeInt(-7000000000010), 'negative seven trillion and ten');
	assert.equal(writeInt(-8000000000001), 'negative eight trillion and one');
	assert.equal(writeInt(-9000000000000), 'negative nine trillion');

	assert.end();
});

test('en: other', function(assert) {
	assert.equal(writeInt(11, {lang: "en"}), 'eleven');

	assert.equal(writeInt("93"), 'ninety-three');

	assert.equal(writeInt(1e2), 'one hundred');
	assert.equal(writeInt("1e2"), 'one hundred');

	assert.equal(writeInt(-1e2), 'negative one hundred');
	assert.equal(writeInt("-1e2"), 'negative one hundred');

	// Acceptable because Number(arg) returns a number primitive
	assert.equal(writeInt(Number(23456)), 'twenty-three thousand four hundred and fifty-six');

	assert.equal(writeInt(567890, {}), 'five hundred and sixty-seven thousand eight hundred and ninety');

	assert.end();
});
