'use strict';

// MODULES //

var ERF = require( './number.js' );

// ERROR FUNCTION //

/**
* FUNCTION: erf( out, arr )
*	Computes the error function for each array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Null} output array or null
*/
function erf( y, x ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		y[ i ] = ERF( x[ i ] );
	}
	return y;
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;
