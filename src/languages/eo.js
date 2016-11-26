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

		var result = "";

		for (var i = digits.length - 1; i > 0; i -= 3) {
			var tri = (i + 1) / 3;

			var triDigits = digits.slice(i - 2, i + 1);

			if (tri >= 3) {
				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (result != "") {
						result += " ";
					}

					var num = this.writePositiveUnder1000(triDigits);

					result += num + " ";

					if (num == this.base["1"]) {
						result += this.unit[tri].singular;
					}
					else {
						result += this.unit[tri].plural;
					}
				}
			}
			else if (tri == 2) {
				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (result != "") {
						result += " ";
					}

					var num = this.writePositiveUnder1000(triDigits);

					if (num != this.base["1"]) {
						result += num + " ";
					}

					result += this.base["1000"];
				}
			}
			else {
				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (result != "") {
						result += " ";
					}

					result += this.writePositiveUnder1000(triDigits);
				}
			}
		}

		return result;
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		return 'nulo';
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt(-1),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt(1e15),

	/**
	 * Return number (under 1000) written out
	 * @param {number[]} digits
	 * - Least significant digit first in `digits`
	 * @returns {string}
	 */
	writePositiveUnder1000: function(digits) {
		var result = "";

		if (digits[2] > 0) {
			if (digits[2] > 1) {
				result += this.base[String(digits[2])];
			}

			result += this.base["100"];
		}

		if (digits[1] > 0) {
			if (result != "") {
				result += " ";
			}

			if (digits[1] > 1) {
				result += this.base[String(digits[1])];
			}

			result += this.base["10"];
		}

		if (digits[0] > 0) {
			if (result != "") {
				result += " ";
			}

			result += this.base[String(digits[0])];
		}

		return result;
	},

	/**
	 * Numbers that can stand on their own and are building blocks
	 */
	base: {
		"1": "unu",
		"2": "du",
		"3": "tri",
		"4": "kvar",
		"5": "kvin",
		"6": "ses",
		"7": "sep",
		"8": "ok",
		"9": "naŭ",
		"10": "dek",
		"100": "cent",
		"1000": "mil"
	},

	/**
	 * The unit for the nth 3-digit group
	 */
	unit: {
		"3": {
			singular: "miliono",
			plural: "milionoj"
		},
		"4": {
			singular: "miliardo",
			plural: "miliardoj"
		},
		"5": {
			singular: "duiliono",
			plural: "duilionoj"
		}
	}
}
