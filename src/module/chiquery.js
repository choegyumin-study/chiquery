// require.config({
// 	baseUrl: '.'
// });

define([
	'./core'
], function(chiQuery) {

	"use strict";

	console.log('chiquery');

	return (window.chiQuery = window.$ = chiQuery);
});
