
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

	it( 'should do something' );

});