var test = require('tape');

var writeInt = require('../dist/writeInt.js');

var options = {
	lang: 'jb'
};

test('jb: 0 through 10', function(assert) {
	assert.equal(writeInt(0, options), 'no');
	assert.equal(writeInt(1, options), 'pa');
	assert.equal(writeInt(2, options), 're');
	assert.equal(writeInt(3, options), 'ci');
	assert.equal(writeInt(4, options), 'vo');
	assert.equal(writeInt(5, options), 'mu');
	assert.equal(writeInt(6, options), 'xa');
	assert.equal(writeInt(7, options), 'ze');
	assert.equal(writeInt(8, options), 'bi');
	assert.equal(writeInt(9, options), 'so');
	assert.equal(writeInt(10, options), 'pano');

	assert.end();
});

test('jb: more', function(assert) {
	assert.equal(writeInt(11, options), 'papa');
	assert.equal(writeInt(12, options), 'pare');
	assert.equal(writeInt(57, options), 'muze');
	assert.equal(writeInt(91, options), 'sopa');
	assert.equal(writeInt(567, options), 'muxaze');
	assert.equal(writeInt(9182, options), 'sopabire');

	assert.end();
});

test('jb: negative', function(assert) {
	assert.equal(writeInt(-11, options), "ni'u papa");
	assert.equal(writeInt(-12, options), "ni'u pare");
	assert.equal(writeInt(-57, options), "ni'u muze");
	assert.equal(writeInt(-91, options), "ni'u sopa");
	assert.equal(writeInt(-567, options), "ni'u muxaze");
	assert.equal(writeInt(-9182, options), "ni'u sopabire");

	assert.end();
});
