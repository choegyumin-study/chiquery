export default function() {

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
		var len = elements.length,
			element;
		if (typeof idx === 'number') {
			if (idx < 0) idx = len + idx;
			element = elements[idx];
		} else {
			element = tool_fn().nodesToArray(elements);
		}
		return element;
	};

	modules.index = function(context, element) {
		if (element) element = $(element);
		var returning = '-1';
		context.each(function(idx) {
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
