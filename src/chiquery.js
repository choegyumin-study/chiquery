require.config({
	baseUrl: '.'
});

define([
	'module/core',
	'module/exports'
], function(chiQuery) {

	"use strict";

	return (window.chiQuery = window.$ = chiQuery);
});
