/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	erf = require( './../lib' ),

	// Error function:
	ERF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
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

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the error function when provided a number', function test() {
		assert.strictEqual( erf( 0 ), 0 );
		assert.closeTo( erf( 0.5 ), 0.52049987, 1e-7 );
	});

	it( 'should evaluate the error function when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = [
			-0.9999779,
			-0.9953222,
			-0.8427007,
			0,
			0.8427007,
			0.9953222,
			0.9999779
		];

		actual = erf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = erf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the error function when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			-0.9999779,
			-0.9953222,
			-0.8427007,
			0,
			0.8427007,
			0.9953222,
			0.9999779
		]);

		actual = erf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = erf( data, {
			'copy': false
		});
		expected = new Int8Array( [ 0, 0, 0, 0, 0, 0, 0 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the error function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = new Int8Array( [ 0, 0, 0, 0, 0, 0, 0 ] );

		actual = erf( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the error function element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			-0.9999779,
			-0.9953222,
			-0.8427007,
			0,
			0.8427007,
			0.9953222,
			0.9999779
		];

		actual = erf( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = erf( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the error function element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,-0.9999779]},
			{'x':[1,-0.9953222]},
			{'x':[2,-0.8427007]},
			{'x':[3,0]},
			{'x':[4,0.8427007]},
			{'x':[5,0.9953222]},
			{'x':[6,0.9999779]}
		];

		actual = erf( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}


		// Specify a path with a custom separator...

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = erf( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

	});

	it( 'should evaluate the error function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = ERF( i / 5);
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erf( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = erf( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the error function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = ERF( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erf( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( erf( [] ) );
		assert.isNull( erf( matrix( [0,0] ) ) );
		assert.isNull( erf( new Int8Array() ) );
	});

});
