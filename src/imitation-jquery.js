require.config({
	baseUrl: '.'
});

require(['unit/core/DOM'], function(query) {
	var els = query('.test');
	console.log(els);
});
