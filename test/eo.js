var test = require('tape');

var writeInt = require('../dist/writeInt.js');

var options = {
	lang: 'eo'
};

test('eo: 0 through 10', function(assert) {
	assert.equal(writeInt(0, options), 'nulo');
	assert.equal(writeInt(1, options), 'unu');
	assert.equal(writeInt(2, options), 'du');
	assert.equal(writeInt(3, options), 'tri');
	assert.equal(writeInt(4, options), 'kvar');
	assert.equal(writeInt(5, options), 'kvin');
	assert.equal(writeInt(6, options), 'ses');
	assert.equal(writeInt(7, options), 'sep');
	assert.equal(writeInt(8, options), 'ok');
	assert.equal(writeInt(9, options), 'naŭ');
	assert.equal(writeInt(10, options), 'dek');

	assert.end();
});

test('eo: more', function(assert) {
	assert.equal(writeInt(34, options), 'tridek kvar');
	assert.equal(writeInt(40, options), 'kvardek');
	assert.equal(writeInt(100, options), 'cent');
	assert.equal(writeInt(200, options), 'ducent');
	assert.equal(writeInt(800, options), 'okcent');
	assert.equal(writeInt(1000, options), 'mil');
	assert.equal(writeInt(1234, options), 'mil ducent tridek kvar');
	assert.equal(writeInt(6000, options), 'ses mil');
	assert.equal(writeInt(6101, options), 'ses mil cent unu');
	assert.equal(writeInt(100000, options), 'cent mil');
	assert.equal(writeInt(1000000, options), 'unu miliono');
	assert.equal(writeInt(1000200, options), 'unu miliono ducent');
	assert.equal(writeInt(2000000, options), 'du milionoj');
	assert.equal(writeInt(2000001, options), 'du milionoj unu');
	assert.equal(writeInt(2000011, options), 'du milionoj dek unu');
	assert.equal(writeInt(2000100, options), 'du milionoj cent');
	assert.equal(writeInt(2000111, options), 'du milionoj cent dek unu');
	assert.equal(writeInt(10001000, options), 'dek milionoj mil');
	assert.equal(writeInt(23006000, options), 'dudek tri milionoj ses mil');
	assert.equal(writeInt(147005001, options), 'cent kvardek sep milionoj kvin mil unu');
	assert.equal(writeInt(221005001, options), 'ducent dudek unu milionoj kvin mil unu');
	assert.equal(writeInt(1000005001, options), 'unu miliardo kvin mil unu');

	assert.end();
});

test('eo: writePositiveUnder1000', function(assert) {
	// Don't test [0, 0, 0] because 0 not positive
	assert.equal(writeInt.eo.writePositiveUnder1000([1, 0, 0]), 'unu');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 1, 0]), 'dek');
	assert.equal(writeInt.eo.writePositiveUnder1000([2, 1, 0]), 'dek du');
	assert.equal(writeInt.eo.writePositiveUnder1000([9, 1, 0]), 'dek naŭ');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 2, 0]), 'dudek');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 3, 0]), 'tridek');
	assert.equal(writeInt.eo.writePositiveUnder1000([2, 3, 0]), 'tridek du');
	assert.equal(writeInt.eo.writePositiveUnder1000([6, 7, 0]), 'sepdek ses');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 9, 0]), 'naŭdek');
	assert.equal(writeInt.eo.writePositiveUnder1000([9, 9, 0]), 'naŭdek naŭ');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 0, 1]), 'cent');
	assert.equal(writeInt.eo.writePositiveUnder1000([1, 0, 1]), 'cent unu');
	assert.equal(writeInt.eo.writePositiveUnder1000([4, 0, 1]), 'cent kvar');
	assert.equal(writeInt.eo.writePositiveUnder1000([8, 0, 1]), 'cent ok');
	assert.equal(writeInt.eo.writePositiveUnder1000([9, 0, 1]), 'cent naŭ');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 0, 2]), 'ducent');
	assert.equal(writeInt.eo.writePositiveUnder1000([1, 0, 2]), 'ducent unu');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 6, 2]), 'ducent sesdek');
	assert.equal(writeInt.eo.writePositiveUnder1000([5, 7, 2]), 'ducent sepdek kvin');
	assert.equal(writeInt.eo.writePositiveUnder1000([0, 0, 8]), 'okcent');

	assert.end();
});
