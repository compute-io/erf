/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should evaluate the error function', function test() {
		assert.closeTo( erf( 9 ), 1, 1e-4 );
		assert.closeTo( erf( 900 ), 1, 1e-4 );
		assert.closeTo( erf( 1 ), 0.8427, 1e-4 );
		assert.closeTo( erf( 0.1 ), 0.1125, 1e-4 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erf( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return 1 if provided positive infinity', function test() {
		var inf = Number.POSITIVE_INFINITY,
			val = erf( inf );
		assert.strictEqual( val, 1 );
	});

	it( 'should return -1 if provided negative infinity', function test() {
		var ninf = Number.NEGATIVE_INFINITY,
			val = erf( ninf );
		assert.strictEqual( val, -1 );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( erf( 1 ) );
	});

});
