'use strict';

var erf = require( './../lib' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
console.log( erf( data ) );
