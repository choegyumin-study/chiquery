define( [
	"./core"
], function( chiQuery ) {

"use strict";

// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "chiquery", [], function() {
		return chiQuery;
	} );
}

} );
