// Lojban number reference:
//  https://en.wikibooks.org/wiki/Lojban/Numbers

// "ni’u is the Lojban minus sign (for negative numbers, not for subtraction)"
//  - Lojban for Beginners by Robin Turner and Nick Nicholas

var bigInt = require('big-integer');

module.exports = {
	/**
	 * Return the number having `digits` written out as a string
	 * The number having `digits` is guaranteed to be > MIN and < MAX
	 * @param {number[]} digits
	 * - Least significant digit first in array
	 * - Guaranteed to have at least one nonzero digit
	 * @param {boolean} positive - is the number positive
	 * @param {object} options
	 * @returns {string}
	 */
	write: function(digits, positive, options) {
		var result = "";

		for (var i = 0; i < digits.length; i += 1) {
			result = this.base[digits[i]] + result;
		}

		if (positive) {
			return result;
		}

		return "ni'u " + result;
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		return "no";
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt('-1.8e308'),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt( '1.8e308'),

	/**
	 * Numbers that can stand on their own and are building blocks
	 */
	base: {
		"0": "no",
		"1": "pa",
		"2": "re",
		"3": "ci",
		"4": "vo",
		"5": "mu",
		"6": "xa",
		"7": "ze",
		"8": "bi",
		"9": "so"
	}
}
