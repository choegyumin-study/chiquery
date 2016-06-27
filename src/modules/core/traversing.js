export function core_traversing() {

	"use strict";

	var modules = {};

	modules.each = function(elements, callback) {
		var len = elements.length;
		for (var _i = 0; _i < len; _i++) {
			var element = elements[_i];
			callback.call(element, _i, element);
		}
		return this;
	};

	return modules;

}
