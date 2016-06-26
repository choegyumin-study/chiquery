// require.config({
// 	baseUrl: '.'
// });

define([
	'./tool',
	'./core',
	'./extend'
], function(tool, chiQuery) { // 설계축소

	"use strict";

	return (window.chiQuery = window.$ = chiQuery);
});
