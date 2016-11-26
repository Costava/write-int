// Large number names reference:
//  https://en.wikipedia.org/wiki/Names_of_large_numbers

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
		// Add leading zeros if necessary to ensure there are 3 * n digits
		if (digits.length % 3 !== 0) {
			var missing = 3 - digits.length % 3;

			for (var i = 0; i < missing; i += 1) {
				digits.push(0);
			}
		}

		if (positive) {
			return this.writePositive(digits);
		}

		return "negative " + this.writePositive(digits);
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		return 'zero';
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt(-1e66),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt(1e66),

	/**
	 * Return the positive number having `digits` written out as a string
	 * @param {number[]} digits
	 * - Least significant digit first in array
	 * - Should have at least one nonzero digit
	 * @returns {string}
	 */
	writePositive: function(digits) {
		var result = "";

		for (var i = digits.length - 1; i > 0; i -= 3) {
			var tri = (i + 1) / 3;

			var amount = this.writePositiveUnder1000(
				[digits[i - 2], digits[i - 1], digits[i]]
			);

			if (tri >= 2) {
				if (amount != this.base[0]) {
					if (result.length === 0) {
						result = amount + " " + this.unit[tri];
					}
					else {
						result += " " + amount + " " + this.unit[tri];
					}
				}
			}
			else {
				if (result.length === 0) {
					result = amount;
				}
				else {
					if (digits[2] > 0) {
						result += " " + amount;
					}
					else if (amount != this.base[0]) {
						result += " and " + amount;
					}
				}
			}
		}

		return result;
	},

	/**
	 * Return number (under 1000) written out
	 * @param {number[]} digits
	 * - Least significant digit first in `digits`
	 * @returns {string}
	 */
	writePositiveUnder1000: function(digits) {
		if (digits[0] === 0 && digits[1] === 0 && digits[2] === 0) {
			return this.base[0];
		}

		var result = "";

		if (digits[2] > 0) {
			result += this.base[digits[2]] + " hundred";

			if (digits[1] === 0 && digits[0] === 0) {
				return result;
			}
			else {
				result += " and ";
			}
		}

		if (digits[1] === 0) {
			result += this.base[digits[0]];
		}
		else {
			if (digits[1] === 1) {
				result += this.base[String(digits[1]) + String(digits[0])];
			}
			else {
				result += this.base[digits[1] * 10];

				if (digits[0] > 0) {
					result += "-" + this.base[digits[0]];
				}
			}
		}

		return result;
	},

	/**
	 * Numbers that can stand on their own and are building blocks
	 */
	base: {
		"1": "one",
		"2": "two",
		"3": "three",
		"4": "four",
		"5": "five",
		"6": "six",
		"7": "seven",
		"8": "eight",
		"9": "nine",
		"10": "ten",
		"11": "eleven",
		"12": "twelve",
		"13": "thirteen",
		"14": "fourteen",
		"15": "fifteen",
		"16": "sixteen",
		"17": "seventeen",
		"18": "eighteen",
		"19": "nineteen",
		"20": "twenty",
		"30": "thirty",
		"40": "forty",
		"50": "fifty",
		"60": "sixty",
		"70": "seventy",
		"80": "eighty",
		"90": "ninety"
	},

	/**
	 * The unit for the nth 3-digit group
	 */
	unit: {
		"2": "thousand",
		"3": "million",
		"4": "billion",
		"5": "trillion",
		"6": "quadrillion",
		"7": "quintillion",
		"8": "sextillion",
		"9": "septillion",
		"10": "octillion",
		"11": "nonillion",
		"12": "decillion",
		"13": "undecillion",
		"14": "duodecillion",
		"15": "tredecillion",
		"16": "quattuordecillion",
		"17": "quindecillion",
		"18": "sexdecillion",
		"19": "septendecillion",
		"20": "octodecillion",
		"21": "novemdecillion",
		"22": "vigintillion"
	}
}
