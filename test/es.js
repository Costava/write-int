var test = require('tape');

var writeInt = require('../dist/writeInt.js');

var options = {
	lang: 'es'
};

test('es: 0 through 10', function(assert) {
	assert.equal(writeInt(0, options), 'cero');
	assert.equal(writeInt(1, options), 'uno');
	assert.equal(writeInt(2, options), 'dos');
	assert.equal(writeInt(3, options), 'tres');
	assert.equal(writeInt(4, options), 'cuatro');
	assert.equal(writeInt(5, options), 'cinco');
	assert.equal(writeInt(6, options), 'seis');
	assert.equal(writeInt(7, options), 'siete');
	assert.equal(writeInt(8, options), 'ocho');
	assert.equal(writeInt(9, options), 'nueve');
	assert.equal(writeInt(10, options), 'diez');

	assert.end();
});

test('es: more', function(assert) {
	assert.equal(writeInt(1000, options), 'mil');
	assert.equal(writeInt(2030, options), 'dos mil treinta');
	assert.equal(writeInt(6000, options), 'seis mil');
	assert.equal(writeInt(6101, options), 'seis mil ciento uno');
	assert.equal(writeInt(100000, options), 'cien mil');
	assert.equal(writeInt(1000000, options), 'uno millón');
	assert.equal(writeInt(2000000, options), 'dos millones');
	assert.equal(writeInt(2000001, options), 'dos millones uno');
	assert.equal(writeInt(2000011, options), 'dos millones once');
	assert.equal(writeInt(2000100, options), 'dos millones cien');
	assert.equal(writeInt(2000111, options), 'dos millones ciento once');
	assert.equal(writeInt(10001000, options), 'diez millones mil');
	assert.equal(writeInt(23006000, options), 'veintitrés millones seis mil');
	assert.equal(writeInt(147005001, options), 'ciento cuarenta y siete millones cinco mil uno');
	assert.equal(writeInt(221005001, options), 'doscientos veintiuno millones cinco mil uno');
	assert.equal(writeInt(1000005001, options), 'mil millones cinco mil uno');
	assert.equal(writeInt(999999999999, options), 'novecientos noventa y nueve mil novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve');
	assert.equal(writeInt("999999999999", options), 'novecientos noventa y nueve mil novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve');
	assert.equal(writeInt("999999999999999999", options), 'novecientos noventa y nueve mil novecientos noventa y nueve billones novecientos noventa y nueve mil novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve');
	assert.equal(writeInt("999999999999999999999999", options), 'novecientos noventa y nueve mil novecientos noventa y nueve trillones novecientos noventa y nueve mil novecientos noventa y nueve billones novecientos noventa y nueve mil novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve');

	assert.end();
});

test('es: negative', function(assert) {
	assert.equal(writeInt(-1, options), 'menos uno');
	assert.equal(writeInt(-2, options), 'menos dos');
	assert.equal(writeInt(-11, options), 'menos once');
	assert.equal(writeInt(-90, options), 'menos noventa');
	assert.equal(writeInt(-100, options), 'menos cien');

	assert.end();
});

test('es: writePositiveUnder1000', function(assert) {
	// Don't test [0, 0, 0] because 0 not positive
	assert.equal(writeInt.es.writePositiveUnder1000([1, 0, 0]), 'uno');
	assert.equal(writeInt.es.writePositiveUnder1000([0, 1, 0]), 'diez');
	assert.equal(writeInt.es.writePositiveUnder1000([2, 1, 0]), 'doce');
	assert.equal(writeInt.es.writePositiveUnder1000([9, 1, 0]), 'diecinueve');
	assert.equal(writeInt.es.writePositiveUnder1000([0, 2, 0]), 'veinte');
	assert.equal(writeInt.es.writePositiveUnder1000([0, 3, 0]), 'treinta');
	assert.equal(writeInt.es.writePositiveUnder1000([2, 3, 0]), 'treinta y dos');
	assert.equal(writeInt.es.writePositiveUnder1000([6, 7, 0]), 'setenta y seis');
	assert.equal(writeInt.es.writePositiveUnder1000([0, 9, 0]), 'noventa');
	assert.equal(writeInt.es.writePositiveUnder1000([9, 9, 0]), 'noventa y nueve');
	assert.equal(writeInt.es.writePositiveUnder1000([0, 0, 1]), 'cien');
	assert.equal(writeInt.es.writePositiveUnder1000([1, 0, 1]), 'ciento uno');
	assert.equal(writeInt.es.writePositiveUnder1000([4, 0, 1]), 'ciento cuatro');
	assert.equal(writeInt.es.writePositiveUnder1000([8, 0, 1]), 'ciento ocho');
	assert.equal(writeInt.es.writePositiveUnder1000([9, 0, 1]), 'ciento nueve');

	assert.end();
});

test('es: writePositiveUnder1000000', function(assert) {
	// Don't test [0, 0, 0, 0, 0, 0] because 0 not positive
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 0, 0, 0, 0]), 'uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([2, 0, 0, 0, 0, 0]), 'dos');
	assert.equal(writeInt.es.writePositiveUnder1000000([9, 0, 0, 0, 0, 0]), 'nueve');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 1, 0, 0, 0, 0]), 'diez');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 1, 0, 0, 0, 0]), 'once');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 2, 0, 0, 0, 0]), 'veinte');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 3, 0, 0, 0, 0]), 'treinta');
	assert.equal(writeInt.es.writePositiveUnder1000000([5, 3, 0, 0, 0, 0]), 'treinta y cinco');
	assert.equal(writeInt.es.writePositiveUnder1000000([6, 7, 0, 0, 0, 0]), 'setenta y seis');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 9, 0, 0, 0, 0]), 'noventa');
	assert.equal(writeInt.es.writePositiveUnder1000000([9, 9, 0, 0, 0, 0]), 'noventa y nueve');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 1, 0, 0, 0]), 'cien');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 1, 0, 0, 0]), 'ciento uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([4, 0, 1, 0, 0, 0]), 'ciento cuatro');
	assert.equal(writeInt.es.writePositiveUnder1000000([8, 0, 1, 0, 0, 0]), 'ciento ocho');
	assert.equal(writeInt.es.writePositiveUnder1000000([9, 0, 1, 0, 0, 0]), 'ciento nueve');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 1, 0, 0]), 'mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 0, 1, 0, 0]), 'mil uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 2, 0, 0]), 'dos mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 0, 2, 0, 0]), 'dos mil uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([5, 0, 0, 2, 0, 0]), 'dos mil cinco');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 0, 1, 0]), 'diez mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 0, 0, 1, 0]), 'diez mil uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([4, 0, 0, 0, 1, 0]), 'diez mil cuatro');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 1, 0, 0, 1, 0]), 'diez mil diez');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 1, 0, 0, 1, 0]), 'diez mil once');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 5, 0, 0, 1, 0]), 'diez mil cincuenta');
	assert.equal(writeInt.es.writePositiveUnder1000000([8, 5, 0, 0, 1, 0]), 'diez mil cincuenta y ocho');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 1, 0, 1, 0]), 'diez mil cien');
	assert.equal(writeInt.es.writePositiveUnder1000000([1, 0, 1, 0, 1, 0]), 'diez mil ciento uno');
	assert.equal(writeInt.es.writePositiveUnder1000000([8, 0, 1, 0, 1, 0]), 'diez mil ciento ocho');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 1, 1, 0, 1, 0]), 'diez mil ciento diez');
	assert.equal(writeInt.es.writePositiveUnder1000000([2, 7, 1, 0, 1, 0]), 'diez mil ciento setenta y dos');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 1, 1, 1, 0]), 'once mil cien');
	assert.equal(writeInt.es.writePositiveUnder1000000([6, 5, 4, 3, 2, 0]), 'veintitrés mil cuatrocientos cincuenta y seis');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 8, 0, 8, 0]), 'ochenta mil ochocientos');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 0, 0, 1]), 'cien mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 0, 0, 2]), 'doscientos mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([0, 0, 0, 0, 8, 3]), 'trescientos ochenta mil');
	assert.equal(writeInt.es.writePositiveUnder1000000([3, 2, 1, 2, 8, 4]), 'cuatrocientos ochenta y dos mil ciento veintitrés');

	assert.end();
});
