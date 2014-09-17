
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erf', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				5,
				'5',
				true,
				undefined,
				null,
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erf( value );
			};
		}
	});

	it( 'should throw an error if a data array contains non-numeric values', function test() {
		var values = [
				'5',
				true,
				undefined,
				null,
				[],
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erf( value );
			};
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erf( [ NaN ] )[ 0 ];
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return 1 if provided positive infinity', function test() {
		var inf = Number.POSITIVE_INFINITY,
			val = erf( [ inf ] )[ 0 ];
		assert.strictEqual( val, 1 );
	});

	it( 'should return -1 if provided negative infinity', function test() {
		var ninf = Number.NEGATIVE_INFINITY,
			val = erf( [ ninf ] )[ 0 ];
		assert.strictEqual( val, -1 );
	});

	it( 'should return an array of numbers', function test() {
		var values = [
				1e-306,
				-1e-306,
				1e-299,
				-1e-299,
				0.8,
				-0.8,
				1,
				-1,
				10,
				-10,
				2,
				-2,
				3,
				-3
			],
			val;

		for ( var i = 0; i < values.length; i++ ) {
			val = erf( [ values[ i ] ] );
			assert.isArray( val );
			assert.isNumber( val[ 0 ] );
		}
	});

	it( 'should evaluate the error function', function test() {
		var values, expected, actual;

		values = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];

		// Evaluated on Wolfram Alpha:
		expected = [
			1.128379e-300,
			-1.128379e-300,
			1.128379e-299,
			-1.128379e-299,
			0.742101,
			-0.742101,
			0.84270079,
			-0.84270079,
			0.999999999,
			-0.999999999,
			0.995322265,
			-0.995322265,
			0.9999779095,
			-0.9999779095
		];

		actual = erf( values );

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

});