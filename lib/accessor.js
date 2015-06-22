'use strict';

// FUNCTIONS

var ERF = require( './number.js' );


// ERROR FUNCTION //

/**
* FUNCTION: erf( out, arr, accessor )
*	Computes the error function for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]} output array
*/
function erf( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = ERF( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;
