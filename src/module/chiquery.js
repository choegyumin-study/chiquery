// require.config({
// 	baseUrl: '.'
// });

define([
	'./core'
], function(chiQuery) {

	"use strict";

	return (window.chiQuery = window.$ = chiQuery);
});
