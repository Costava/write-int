var bigInt = require('big-integer');

/**
 * This file outlines how a new language should be defined
 */
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
		// Return a string of the written form
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		// Return 0 written
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt(-100),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt("100")
}
