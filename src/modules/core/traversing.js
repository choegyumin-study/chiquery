define(function() {

	"use strict";

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

	}(self));

	var modules = {};

	modules.each = function(elements, callback) {
		var length, i = 0;
		if (isArrayLike(obj)) {
			length = obj.length;
			for (; i < length; i++) {
				if (callback.call(obj[i], i, obj[i]) === false) {
					break;
				}
			}
		} else {
			for (i in obj) {
				if (callback.call(obj[i], i, obj[i]) === false) {
					break;
				}
			}
		}
		return i;
	};

	return modules;
});
