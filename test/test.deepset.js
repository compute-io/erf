/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should compute the error function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = erf( data, 'x' );
		// evaluated on Wolfram Alpha
		expected = [
			{'x':-0.9999779},
			{'x':-0.9953222},
			{'x':-0.8427007},
			{'x':0},
			{'x':0.8427007},
			{'x':0.9953222},
			{'x':0.9999779}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-7 );
		}

		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = erf( data, 'x/1', '/' );
		expected = [
			{'x':[9,-0.9999779]},
			{'x':[9,-0.9953222]},
			{'x':[9,-0.8427007]},
			{'x':[9,0]},
			{'x':[9,0.8427007]},
			{'x':[9,0.9953222]},
			{'x':[9,0.9999779]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7, 'custm separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erf( [], 'x' ), [] );
		assert.deepEqual( erf( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = erf( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
