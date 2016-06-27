export function core_miscellaneous() {

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

	modules.get = function(elements, idx) {
		var element;
		if(typeof idx === 'number') {
			element = elements[idx];
		} else {
			element = elements;
		}
		return element;
	}

	return modules;

}
