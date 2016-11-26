# write-int

Convert integer numbers to their written form.

Inspired by [js-written-number](https://github.com/yamadapc/js-written-number)

## Usage
### Install with npm
```
npm install --save write-int
```

And require it where needed:
```JavaScript
var writeInt = require('write-int');
```

### Reference as script
It also works to simply reference in a `script` tag:
```HTML
<script src="path/to/writeInt.min.js"></script>
```

### English
English is the default language. Numbers supported between -1e66 and 1e66 exclusive (1 followed by 66 zeros or 1 * 10^66).
```JavaScript
writeInt(123);// => 'one hundred and twenty-three'
```

### Spanish
Numbers supported between -1e24 and 1e24 (exclusive).
```JavaScript
writeInt(2030, {lang: 'es'});// => 'dos mil treinta'
```

### German
Numbers supported between -1e18 and 1e18 (exclusive).
```JavaScript
writeInt(2000, {lang: 'de'});// => 'zweitausend'
```

### Esperanto
Numbers supported from 0 up through 1e15 - 1.
```JavaScript
writeInt(1234, {lang: 'eo'});// => 'mil ducent tridek kvar'
```

### Lojban
Numbers supported between -1.8e308 and 1.8e308 (exclusive).
```JavaScript
writeInt(11, {lang: 'jb'});// => 'papa'
```

### Specification
`writeInt(number[, options])`

- @param {number|string} number
- @param {object} [options]
- @property {string} [options.lang='en']
- @property {boolean} [options.einhundert=false]
- - whether to include 'ein' for 100 in German
- - 100 is 'einhundert' if true, 'hundert' if false
- @property {boolean} [options.eintausend=false]
- - whether to include 'ein' for 1000 in German
- - 1000 is 'eintausend' if true, 'tausend' if false
- @returns {string|null}

Returns `number` written out if it is representable (within supported range of valid language), else returns `null`. If `number` is type string, it should be a base 10 number.

Example:
```JavaScript
writeInt(11);// => 'eleven'
writeInt("11");// => 'eleven'
writeInt("1e2");// => 'one hundred'

writeInt(11, {lang: 'es'});// => 'once'

writeInt(100, {lang: 'de'});// => 'hundert'
writeInt(100, {lang: 'de', einhundert: true});// => 'einhundert'

writeInt();// => null
writeInt({});// => null
writeInt('foo');// => null
```

---

`writeInt.supported(lang)`

- @param {string} lang
- @returns {boolean}

Returns whether `lang` is a supported language.

Example:
```Javascript
writeInt.supported('en');// => true

writeInt.supported('xy');// => false
```

---

`writeInt.representable(number, lang)`

- @param {number|string} number
- @param {string} lang
- @returns {boolean}

Returns whether `number` is representable (within the supported range) in `lang`. Returns false if `lang` is not supported. If `writeInt()` is called for an unrepresentable number, then `null` is returned.

Example:
```Javascript
writeInt.representable(12, 'en');// => true

writeInt.representable(12, 'xy');// => false

writeInt.representable('a', 'en');// => false
```

## Supported languages
- English `lang: 'en'`
- Spanish `lang: 'es'`
- German `lang: 'de'`
- Esperanto `lang: 'eo'`
- Lojban `lang: 'jb'`

## Contributing
1. Fork the repo
2. Make a new branch
3. Make the changes
4. Run `npm run build` to build to `dist/writeInt.js` and `dist/writeInt.min.js`
4. Run `npm run test` to check that all tests pass
5. Submit a pull request
6. Thanks!

### Adding a language
1. Create a copy of `src/languages/interface.js` and rename it to the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code of the language.
2. Implement the functions and properties for the language. Any helper functions and properties can be made as well.
3. Create a test file in `test` with the same file name.

Note: [Lojban](https://en.wikipedia.org/wiki/Lojban) does not have a ISO 639-1 code. "jb", which is unspecified in ISO 639-1, is used for Lojban. (The Lojban code in ISO 639-2 and ISO 639-3 is "jbo").
