'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	ERF = require( './number.js' );


// ERROR FUNCTION //

/**
* FUNCTION: erf( arr, path[, sep] )
*	Computes the error function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function erf( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			dset( x[i], ERF( dget( x[i] ) ) );
		}
	}
	return x;
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;
