import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.each = function(_this, callback) {
		var len = _this.length;
		for (var _i = 0; _i < len; _i++) {
			var element = _this.get(_i);
			callback.call(element, _i, element);
		}
		return _this;
	};

	modules.get = function(_this, idx) {
		var len = _this.length,
			element;
		if (global_fn().isNumber(idx)) {
			if (idx < 0) idx = len + idx;
			element = _this[idx];
		} else {
			element = global_fn().nodesToArray(_this);
		}
		return element;
	};

	modules.index = function(_this, element) {
		if (element) element = $(element);
		var returnIdx = '-1';
		_this.each(function(idx) {
			if (element) {
				if (this === element.get()) returnIdx = idx;
			}
		});
		return returnIdx;
	};

	modules.size = function(_this) {
		return _this.length;
	};

	return modules;

}
