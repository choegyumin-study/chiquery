export function core_miscellaneous() {

	"use strict";

	var modules = {};

	modules.get = function(elements, idx) {
		var len = elements.length,
			element;
		if (typeof idx === 'number') {
			if (idx < 0) idx = len + idx;
			element = elements[idx];
		} else {
			element = Array.prototype.slice.call(elements)
		}
		return element;
	};

	modules.index = function(context, element) {
		var returning = '-1';
		context.each(function(idx) {
			if (element) {
				if (this === element.get()) returning = idx;
			}
		});
		return returning;
	};

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
