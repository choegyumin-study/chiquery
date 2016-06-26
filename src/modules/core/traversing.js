define(function() {

	"use strict";

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

	}(self));

	var modules = {};

	modules.each = function(elements, callback) {
		for (i in elements) {
			var i = 0;
			if (callback.call(elements[i], i, elements[i]) === false) {
				break;
			}
			return i;
		}
	};

	return modules;
});
