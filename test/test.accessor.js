/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should evaluate the error function using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );

		actual = erf( actual, data, getValue );

		// evaluated on Wolfram Alpha
		expected = [
			-0.9999779,
			-0.9953222,
			-0.8427007,
			0,
			0.8427007,
			0.9953222,
			0.9999779
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d.x;
		}

		data = [
			[1,1e-306],
			[2,-1e-306],
			[3,1e-299],
			[4,-1e-299],
			[5,0.8],
			[6,-0.8],
			[7,1],
			[8,-1],
			[9,10],
			[10,-10],
			[11,2],
			[12,-2],
			[13,3],
			[14,-3]
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

		actual = new Array( data.length );
		actual = erf( actual, data, getValue2 );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
		function getValue2( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erf( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
