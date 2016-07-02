import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};
	
	modules.attr = function(_this, attrName, attrValue) {
		var element,
			len = _this.length;
		if (global_fn().isUndefined(attrValue)) {
			if(len < 1) return _this;
			return _this[0].getAttribute(attrName);
		} else if (global_fn().isString(attrValue)) {
			for (var _i = 0; _i < len; _i++) {
				element = _this[_i];
				element.setAttribute(attrName, attrValue);
			}
		} else if (global_fn().isFunction(attrValue)) {
			if(len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this[_i];
				attrValue.call(element, _i, element.getAttribute(attrName));
			}
		}
		return _this;
	};

	return modules;

}
