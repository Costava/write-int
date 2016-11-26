var test = require('tape');

var writeInt = require('../dist/writeInt.js');

var options = {
	lang: 'de'
};

test('de: 0 through 10', function(assert) {
	assert.equal(writeInt(0, options), 'null');
	assert.equal(writeInt(1, options), 'eins');
	assert.equal(writeInt(2, options), 'zwei');
	assert.equal(writeInt(3, options), 'drei');
	assert.equal(writeInt(4, options), 'vier');
	assert.equal(writeInt(5, options), 'fünf');
	assert.equal(writeInt(6, options), 'sechs');
	assert.equal(writeInt(7, options), 'sieben');
	assert.equal(writeInt(8, options), 'acht');
	assert.equal(writeInt(9, options), 'neun');
	assert.equal(writeInt(10, options), 'zehn');

	assert.end();
});

test('de: more', function(assert) {
	assert.equal(writeInt(11, options), 'elf');
	assert.equal(writeInt(20, options), 'zwanzig');
	assert.equal(writeInt(44, options), 'vierundvierzig');
	assert.equal(writeInt(100, options), 'hundert');
	assert.equal(writeInt(101, options), 'hunderteins');
	assert.equal(writeInt(201, options), 'zweihunderteins');
	assert.equal(writeInt(411, options), 'vierhundertelf');
	assert.equal(writeInt(1000, options), 'tausend');
	assert.equal(writeInt(1001, options), 'tausendeins');
	assert.equal(writeInt(2000, options), 'zweitausend');
	assert.equal(writeInt(9000, options), 'neuntausend');
	assert.equal(writeInt(123000, options), 'hundertdreiundzwanzigtausend');
	assert.equal(writeInt(223000, options), 'zweihundertdreiundzwanzigtausend');
	assert.equal(writeInt(1000000, options), 'eine Million');
	assert.equal(writeInt(2000001, options), 'zwei Millionen eins');
	assert.equal(writeInt(2000100, options), 'zwei Millionen hundert');
	assert.equal(writeInt(2001000, options), 'zwei Millionen tausend');
	assert.equal(writeInt(7001100, options), 'sieben Millionen tausendhundert');
	assert.equal(writeInt(2002000, options), 'zwei Millionen zweitausend');
	assert.equal(writeInt(7002000, options), 'sieben Millionen zweitausend');
	assert.equal(writeInt(7478000, options), 'sieben Millionen vierhundertachtundsiebzigtausend');
	assert.equal(writeInt(7478001, options), 'sieben Millionen vierhundertachtundsiebzigtausendeins');
	assert.equal(writeInt(7478010, options), 'sieben Millionen vierhundertachtundsiebzigtausendzehn');
	assert.equal(writeInt(7478100, options), 'sieben Millionen vierhundertachtundsiebzigtausendhundert');
	assert.equal(writeInt(1000000000, options), 'eine Milliarde');
	assert.equal(writeInt(1000000000000, options), 'eine Billion');
	assert.equal(writeInt(1000000000000000, options), 'eine Billiarde');
	assert.equal(writeInt(2000000000000000, options), 'zwei Billiarden');
	assert.equal(writeInt(2000000000000001, options), 'zwei Billiarden eins');
	assert.equal(writeInt(2000000000000100, options), 'zwei Billiarden hundert');

	assert.equal(writeInt(100, {lang: 'de', einhundert: true}), 'einhundert');
	assert.equal(writeInt(123000, {lang: 'de', einhundert: true}), 'einhundertdreiundzwanzigtausend');
	assert.equal(writeInt(2000100, {lang: 'de', einhundert: true}), 'zwei Millionen einhundert');
	assert.equal(writeInt(7478100, {lang: 'de', einhundert: true}), 'sieben Millionen vierhundertachtundsiebzigtausendeinhundert');

	assert.equal(writeInt(1000, {lang: 'de', eintausend: true}), 'eintausend');
	assert.equal(writeInt(1001, {lang: 'de', eintausend: true}), 'eintausendeins');
	assert.equal(writeInt(2001000, {lang: 'de', eintausend: true}), 'zwei Millionen eintausend');

	assert.end();
});

test('de: negative', function(assert) {
	assert.equal(writeInt(-1, options), 'minus eins');
	assert.equal(writeInt(-11, options), 'minus elf');
	assert.equal(writeInt(-100, options), 'minus hundert');
	assert.equal(writeInt(-101, options), 'minus hunderteins');
	assert.equal(writeInt(-1000, options), 'minus tausend');

	assert.end();
});

test('de: writePositiveUnder1000', function(assert) {
	// Don't test [0, 0, 0] because 0 not positive
	assert.equal(writeInt.de.writePositiveUnder1000([1, 0, 0], {}), 'eins');
	assert.equal(writeInt.de.writePositiveUnder1000([2, 0, 0], {}), 'zwei');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 1, 0], {}), 'zehn');
	assert.equal(writeInt.de.writePositiveUnder1000([2, 1, 0], {}), 'zwölf');
	assert.equal(writeInt.de.writePositiveUnder1000([9, 1, 0], {}), 'neunzehn');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 2, 0], {}), 'zwanzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 3, 0], {}), 'dreißig');
	assert.equal(writeInt.de.writePositiveUnder1000([2, 4, 0], {}), 'zweiundvierzig');
	assert.equal(writeInt.de.writePositiveUnder1000([6, 7, 0], {}), 'sechsundsiebzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 9, 0], {}), 'neunzig');
	assert.equal(writeInt.de.writePositiveUnder1000([9, 9, 0], {}), 'neunundneunzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 0, 1], {}), 'hundert');
	assert.equal(writeInt.de.writePositiveUnder1000([1, 0, 1], {}), 'hunderteins');
	assert.equal(writeInt.de.writePositiveUnder1000([4, 0, 1], {}), 'hundertvier');
	assert.equal(writeInt.de.writePositiveUnder1000([8, 0, 1], {}), 'hundertacht');
	assert.equal(writeInt.de.writePositiveUnder1000([9, 0, 1], {}), 'hundertneun');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 1, 1], {}), 'hundertzehn');
	assert.equal(writeInt.de.writePositiveUnder1000([1, 1, 1], {}), 'hundertelf');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 2, 1], {}), 'hundertzwanzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 0, 2], {}), 'zweihundert');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 8, 2], {}), 'zweihundertachtzig');
	assert.equal(writeInt.de.writePositiveUnder1000([7, 9, 2], {}), 'zweihundertsiebenundneunzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 0, 8], {}), 'achthundert');

	assert.equal(writeInt.de.writePositiveUnder1000([0, 0, 1], {einhundert: true}), 'einhundert');
	assert.equal(writeInt.de.writePositiveUnder1000([1, 0, 1], {einhundert: true}), 'einhunderteins');
	assert.equal(writeInt.de.writePositiveUnder1000([6, 0, 1], {einhundert: true}), 'einhundertsechs');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 4, 1], {einhundert: true}), 'einhundertvierzig');
	assert.equal(writeInt.de.writePositiveUnder1000([0, 0, 4], {einhundert: true}), 'vierhundert');

	assert.end();
});
