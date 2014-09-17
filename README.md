erf
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Error function.


## Installation

``` bash
$ npm install compute-erf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var erf = require( 'compute-erf' );
```

The method accepts a single argument: either a single `numeric` value or an `array` of numeric values, which may include `NaN`, `+infinity`, and `-infinity`. For an input `array`, the error function is evaluated for each value.

``` javascript
erf( -1 );
erf( [ -10, -1, 0, 1, 10 ] );
```


## Examples

``` javascript
// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}

// Evaluate the error function for each datum:
console.log( erf( data ) );
// returns [...]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-erf.svg
[npm-url]: https://npmjs.org/package/compute-erf

[travis-image]: http://img.shields.io/travis/compute-io/erf/master.svg
[travis-url]: https://travis-ci.org/compute-io/erf

[coveralls-image]: https://img.shields.io/coveralls/compute-io/erf/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/erf?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/erf.svg
[dependencies-url]: https://david-dm.org/compute-io/erf

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/erf.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/erf

[github-issues-image]: http://img.shields.io/github/issues/compute-io/erf.svg
[github-issues-url]: https://github.com/compute-io/erf/issues