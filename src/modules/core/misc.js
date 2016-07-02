import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.each = function(elements, callback) {
		var len = elements.length;
		for (var _i = 0; _i < len; _i++) {
			var element = elements[_i];
			callback.call(element, _i, element);
		}
		return elements;
	};

	modules.get = function(elements, idx) {
		var len = elements.length,
			element;
		if (global_fn().isNumber(idx)) {
			if (idx < 0) idx = len + idx;
			element = elements[idx];
		} else {
			element = global_fn().nodesToArray(elements);
		}
		return element;
	};

	modules.index = function(elements, element) {
		if (element) element = $(element);
		var returning = '-1';
		elements.each(function(idx) {
			if (element) {
				if (this === element.get()) returning = idx;
			}
		});
		return returning;
	};

	modules.size = function(elements) {
		return elements.length;
	};

	return modules;

}
