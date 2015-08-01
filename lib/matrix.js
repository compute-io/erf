'use strict';

// MODULES //

var ERF = require( './number.js' );


// ERROR FUNCTION //

/**
* FUNCTION: erf( out, matrix )
*	Evaluates the error function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} matrix - input matrix
* @returns {Matrix} output matrix
*/
function erf( y, x ) {
	var len = x.length,
		i;
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
