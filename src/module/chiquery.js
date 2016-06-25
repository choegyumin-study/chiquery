require.config({
	baseUrl: '.'
});

define([
	'./core',
	'./exports'
], function(chiQuery) {

	"use strict";

	return (window.chiQuery = window.$ = chiQuery);
});
