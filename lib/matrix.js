'use strict';

// MODULES //

var ERF = require( './number.js' );

// ERROR FUNCTION //

/**
* FUNCTION: erf( out, matrix )
*	Evaluates the error function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix|Null} output matrix or null
*/
function erf( y, x ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	if ( y.length !== len ) {
		throw new Error( 'erf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ERF( x.data[ i ] );
	}
	return y;
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;
