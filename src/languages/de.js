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
	 * @property {boolean} [options.einhundert=false]
	 * @property {boolean} [options.eintausend=false]
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
			return this.writePositive(digits, options);
		}

		return 'minus ' + this.writePositive(digits, options);
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		return 'null';
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt(-1e18),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt( 1e18),

	/**
	 * Return the positive number having `digits` written out as a string
	 * @param {number[]} digits
	 * - Least significant digit first in array
	 * - Should have at least one nonzero digit
	 * @param {object} options
	 * @property {boolean} [options.einhundert=false]
	 * @property {boolean} [options.eintausend=false]
	 * @returns {string}
	 */
	writePositive: function(digits, options) {
		var result = "";

		for (var i = digits.length - 1; i > 0; i -= 3) {
			var tri = (i + 1) / 3;

			var triDigits = digits.slice(i - 2, i + 1);

			if (tri >= 3) {
				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (result != "") {
						result += " ";
					}

					var num = this.writePositiveUnder1000(triDigits, options);

					var singular = false;

					if (num == this.base["1"]) {
						num = "eine";

						singular = true;
					}

					result += num;

					if (triDigits[2] == 0 ||
						triDigits[1] == 0 ||
						triDigits[0] == 1)
					{
						if (singular) {
							result += " " + this.unit[tri].singular;
						}
						else {
							result += " " + this.unit[tri].plural;
						}
					}
				}
			}
			else if (tri == 2) {
				var hasThousand = false;

				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					hasThousand = true;

					if (result != "") {
						result += " ";
					}

					var num = this.writePositiveUnder1000(triDigits, options);

					if (num == this.base["1"]) {
						if (options.eintausend) {
							result += "eintausend";
						}
						else {
							result += this.base["1000"];
						}
					}
					else {
						result += num + this.base["1000"];
					}
				}

				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (!hasThousand && result != "") {
						result += " ";
					}

					var triDigits = digits.slice(0, 3);

					var num = this.writePositiveUnder1000(triDigits, options);

					result += num;

					break;
				}
			}
			else {// num is under 1000
				if (triDigits[2] > 0 || triDigits[1] > 0 || triDigits[0] > 0) {
					if (result != "") {
						result += " ";
					}

					var num = this.writePositiveUnder1000(triDigits, options);

					result += num;
				}
			}
		}

		return result;
	},

	/**
	 * Return the positive number under 1000 written out
	 * 0 is not positive
	 * @param {number[]} digits
	 * - least significant digit first in array
	 * - Should have at least one nonzero digit
	 * @param {object} options
	 * @property {boolean} [options.einhundert=false]
	 * @returns {string}
	 */
	writePositiveUnder1000: function(digits, options) {
		var result = "";

		if (digits[2] > 0) {
			if (digits[2] == 1) {
				if (options.einhundert) {
					result += "einhundert";
				}
				else {
					result += this.base["100"];
				}
			}
			else {
				result += this.base[String(digits[2])];
				result += this.base["100"];
			}
		}

		if (digits[1] >= 2) {
			if (digits[0] > 0) {
				result += this.base[String(digits[0])];
				result += "und";
			}

			result += this.base[String(digits[1]) + "0"];
		}
		else if (digits[1] == 1) {
			result += this.base[String(digits[1]) + String(digits[0])];
		}
		else if (digits[0] > 0) {
			result += this.base[String(digits[0])];
		}

		return result;
	},

	/**
	 * Numbers that can stand on their own and are building blocks
	 */
	base: {
		"1": "eins",
		"2": "zwei",
		"3": "drei",
		"4": "vier",
		"5": "fünf",
		"6": "sechs",
		"7": "sieben",
		"8": "acht",
		"9": "neun",
		"10": "zehn",
		"11": "elf",
		"12": "zwölf",
		"13": "dreizehn",
		"14": "vierzehn",
		"15": "fünfzehn",
		"16": "sechzehn",
		"17": "siebzehn",
		"18": "achtzehn",
		"19": "neunzehn",
		"20": "zwanzig",
		"30": "dreißig",
		"40": "vierzig",
		"50": "fünfzig",
		"60": "sechzig",
		"70": "siebzig",
		"80": "achtzig",
		"90": "neunzig",
		"100": "hundert",
		"1000": "tausend"
	},

	/**
	 * The unit for the nth 3-digit group
	 */
	unit: {
		"3": {
			singular: "Million",
			plural: "Millionen"
		},
		"4": {
			singular: "Milliarde",
			plural: "Milliarden"
		},
		"5": {
			singular: "Billion",
			plural: "Billionen"
		},
		"6": {
			singular: "Billiarde",
			plural: "Billiarden"
		}
	}
}
