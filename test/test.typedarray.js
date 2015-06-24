/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should evaluate the error function', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
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
		]);
		actual = new Float64Array( data.length );

		actual = erf( actual, data );

		// Evaluated on Wolfram Alpha:
		expected = new Float64Array([
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
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erf( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
