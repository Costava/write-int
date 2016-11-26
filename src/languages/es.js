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
		// Add leading zeros if necessary to ensure there are 6 * n digits
		if (digits.length % 6 !== 0) {
			var missing = 6 - digits.length % 6;

			for (var i = 0; i < missing; i += 1) {
				digits.push(0);
			}
		}

		if (positive) {
			return this.writePositive(digits);
		}

		return "menos " + this.writePositive(digits);
	},

	/**
	 * Return 0 written out
	 * @param {object} options
	 * @returns {string}
	 */
	zero: function(options) {
		return 'cero';
	},

	/**
	 * The exclusive minimun number that can be represented
	 * The value in `bigInt()` can be a JavaScript number or a base 10 number as
	 *  a string
	 */
	MIN: bigInt(-1e24),

	/**
	 * The exclusive maximum number that can be represented
	 */
	MAX: bigInt( 1e24),

	/**
	 * Return the positive number having `digits` written out as a string
	 * @param {number[]} digits
	 * - Least significant digit first in array
	 * - Should have at least one nonzero digit
	 * @returns {string}
	 */
	writePositive: function(digits) {
		var result = "";

		for (var i = digits.length - 1; i > 0; i -= 6) {
			var sixlet = (i + 1) / 6;

			var sixletDigits = digits.slice(i - 5, i + 1);

			var allZeros = sixletDigits.every(function(digit) {
				return digit == 0;
			});

			if (!allZeros && result != "") {
				result += " ";
			}

			if (sixlet > 1) {
				var additional = this.writePositiveUnder1000000(
					digits.slice(i - 5, i + 1)
				);

				result += additional;

				if (additional == this.base["1"]) {
					result += " " + this.unit[String(sixlet)].singular;
				}
				else {
					result += " " + this.unit[String(sixlet)].plural;
				}
			}
			else {
				result += this.writePositiveUnder1000000(
					digits.slice(i - 5, i + 1)
				);
			}
		}

		return result;
	},

	/**
	 * Return the positive number under 1 000 000 written out
	 * 0 is not positive
	 * @param {number[]} digits - least significant digit first in array
	 * @returns {string}
	 */
	writePositiveUnder1000000: function(digits) {
		if (digits[5] == 0 && digits[4] == 0 && digits[3] == 0) {
			return this.writePositiveUnder1000(digits.slice(0, 3));
		}

		var result = "";

		if (digits[5] == 0 && digits[4] == 0 && digits[3] == 1) {
			result += "mil";
		}
		else {
			var thousandsDigits = digits.slice(3, 6);

			result += this.writePositiveUnder1000(thousandsDigits);

			result += " mil";
		}

		if (digits[2] != 0 || digits[1] != 0 || digits[0] != 0) {
			result += " ";

			var hundredsDigits = digits.slice(0, 3);

			result += this.writePositiveUnder1000(hundredsDigits);
		}

		return result;
	},

	/**
	 * Return the positive number under 1000 written out
	 * 0 is not positive
	 * @param {number[]} digits - least significant digit first in array
	 */
	writePositiveUnder1000: function(digits) {
		var result = "";

		if (digits[2] != "0") {
			var hundredsKey = digits[2] + "00";

			result += this.base[hundredsKey];

			if (digits[1] != 0 || digits[0] != 0) {
				if (digits[2] == 1) {
					result += "to ";// ciento
				}
				else {
					result += " ";
				}
			}
		}

		if (digits[1] < 3) {
			if (digits[1] >= 1) {
				result += this.base[
					String(digits[1]) + String(digits[0])
				];
			}
			else if (digits[0] > 0) {
				result += this.base[String(digits[0])];
			}
		}
		else {
			result += this.base[String(digits[1]) + "0"];

			if (digits[0] > 0) {
				result += " y " + this.base[String(digits[0])];
			}
		}

		return result;
	},

	/**
	 * Numbers that can stand on their own and are building blocks
	 */
	base: {
		"1": "uno",
		"2": "dos",
		"3": "tres",
		"4": "cuatro",
		"5": "cinco",
		"6": "seis",
		"7": "siete",
		"8": "ocho",
		"9": "nueve",
		"10": "diez",
		"11": "once",
		"12": "doce",
		"13": "trece",
		"14": "catorce",
		"15": "quince",
		"16": "dieciséis",
		"17": "diecisiete",
		"18": "dieciocho",
		"19": "diecinueve",
		"20": "veinte",
		"21": "veintiuno",
		"22": "veintidós",
		"23": "veintitrés",
		"24": "veinticuatro",
		"25": "veinticinco",
		"26": "veintiséis",
		"27": "veintisiete",
		"28": "veintiocho",
		"29": "veintinueve",
		"30": "treinta",
		"40": "cuarenta",
		"50": "cincuenta",
		"60": "sesenta",
		"70": "setenta",
		"80": "ochenta",
		"90": "noventa",
		"100": "cien",
		"200": "doscientos",
		"300": "trescientos",
		"400": "cuatrocientos",
		"500": "quinientos",
		"600": "seiscientos",
		"700": "setecientos",
		"800": "ochocientos",
		"900": "novecientos",
		"1000": "mil"
	},

	/**
	 * The unit for the nth 6-digit group
	 */
	unit: {
		"2": {
			singular: "millón",
			plural: "millones"
		},
		"3": {
			singular: "billón",
			plural: "billones"
		},
		"4": {
			singular: "trillón",
			plural: "trillones"
		}
	}
}
