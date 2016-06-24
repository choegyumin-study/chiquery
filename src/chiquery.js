require.config({
	baseUrl: '.'
});

// define([
//], function(chiQuery));

require(['unit/core/DOM'], function(query) {
	var els = query('.test');
	console.log(els);
});
