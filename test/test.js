
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

	it( 'should throw an error if provided a non-numeric value', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erf( value );
			};
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erf( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return 1 if provided positive infinity', function test() {
		var inf = Number.POSITIVE_INFINITY;
		assert.strictEqual( erf( inf ), 1 );
	});

	it( 'should return -1 if provided negative infinity', function test() {
		var ninf = Number.NEGATIVE_INFINITY;
		assert.strictEqual( erf( ninf ), -1 );
	});

	it( 'should return a number', function test() {
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
			];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isNumber( erf( values[i] ) );
		}
	});

});