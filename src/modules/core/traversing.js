define(function() {

	"use strict";

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
