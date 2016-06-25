// require.config({
// 	baseUrl: '.'
// });

define([
	'./core',
	'./exports'
], function(chiQuery) {

	"use strict";

	console.log('chiquery');

	return (window.chiQuery = window.$ = chiQuery);
});
