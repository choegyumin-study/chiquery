// require.config({
// 	baseUrl: '.'
// });

define([
	'./core',
	'./extend'
], function(chiQuery) {

	"use strict";

	return (window.chiQuery = window.$ = chiQuery);
});
