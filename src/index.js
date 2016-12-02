var bigInt = require('big-integer');

/**
 * writeInt
 * Return `number` written out in language `options.lang`.
 * `options` is optional. Default language is english
 * Version: 0.0.2
 * @param {number|string} number
 * - type string means base 10 number as string
 * @param {object} [options]
 * @property {string} [options.lang='en']
 * @returns {string|null} - Returns null if unsupported language or unsupported
 *  number in language
 */
function writeInt(number, options) {
	if (options == undefined || typeof options !== 'object') {
		options = writeInt.defaultOptions;
	}
	else if (options.lang == undefined) {
		options.lang = writeInt.defaultOptions.lang;
	}

	if (writeInt.representable(number, options.lang)) {
		var num = bigInt(number);

		if (num.isZero()) {
			return writeInt[options.lang].zero(options);
		}
		else if (num.isPositive()) {
			return writeInt[options.lang].write(
				writeInt.split(num),
				true,
				options
			);
		}

		return writeInt[options.lang].write(
			writeInt.split(num.abs()),
			false,
			options
		);
	}

	return null;
}

// Provide a reference to bigInt
writeInt.bigInt = bigInt;

writeInt.defaultOptions = {
	lang: 'en'
};

writeInt.languages = ['en', 'es', 'de', 'eo', 'jb'];

writeInt.en = require('./languages/en.js');
writeInt.es = require('./languages/es.js');
writeInt.de = require('./languages/de.js');
writeInt.eo = require('./languages/eo.js');
writeInt.jb = require('./languages/jb.js');

/**
 * Return the digits of positive `number` split into an array. Least significant
 *  digit first in array.
 * @param {bigInt} number
 * @returns {number[]}
 */
writeInt.split = function(number) {
	var digits = [];

	var remaining = number;

	while (remaining.notEquals(0)) {
		var digit = remaining.mod(10).valueOf();

		remaining = remaining.divide(10);

		digits.push(digit);
	}

	return digits;
};

/**
 * Is `number` representable in language `lang`? `lang` default to 'en'
 * @param {number|string} number
 * - type string means base 10 number as string
 * @param {string} [lang]
 * @returns {boolean}
 */
writeInt.representable = function(number, lang) {
	// Check if undefined since bigInt() returns a bigInt instance equal to 0
	if (number == undefined) {
		return false;
	}

	if (lang == undefined) {
		lang = writeInt.defaultOptions.lang;
	}

	if (!writeInt.supported(lang)) {
		return false;
	}

	var num;
	try {
		num = bigInt(number);
	}
	catch (error) {
		return false;
	}

	// Check if num is an instance of bigInt because for example:
	// `bigInt(Math)` returns Math without any errors
	if (!(num instanceof bigInt)) {
		return false;
	}

	return writeInt[lang].MIN.lesser(num) &&
	       writeInt[lang].MAX.greater(num);
};

/**
 * Returns whether the language `lang` is supported
 * @param {string} lang
 * @returns {boolean}
 */
writeInt.supported = function(lang) {
	return writeInt.languages.indexOf(lang) != -1;
};

module.exports = writeInt
