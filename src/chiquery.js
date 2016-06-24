require.config({
	baseUrl: '.'
});

define([
	'unit/core'
], function(chiQuery) {

	"use strict";

	// Start TEST

	console.log(chiQuery);
	var els = chiQuery('.test');
	console.log(els);

	// End TEST

	return (window.chiQuery = window.$ = chiQuery);

});
