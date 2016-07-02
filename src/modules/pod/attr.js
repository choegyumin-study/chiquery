import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.addClass = function(_this, className) {
		var element,
			len = _this.size();
		if (global_fn().isString(className)) {
			if(len < 1) return _this;
			for(var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				$(element).attr("class", $(element).attr("class") + " " + className);
			}
		} else if(global_fn().isFunction(className)) {
			if(len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				$(element).addClass(className.call(element, _i, $(element).attr("class")));
			}
		}
		return _this;
	};
	
	modules.attr = function(_this, attrName, attrValue) {
		var element,
			len = _this.size();
		if (global_fn().isUndefined(attrValue)) {
			if(len < 1) return _this;
			return _this[0].getAttribute(attrName);
		} else if (global_fn().isString(attrValue)) {
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				element.setAttribute(attrName, attrValue);
			}
		} else if (global_fn().isFunction(attrValue)) {
			if(len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				attrValue.call(element, _i, element.getAttribute(attrName));
			}
		}
		return _this;
	};

	modules.removeClass = function(_this, className) {
		var element,
			len = _this.size();
		if (global_fn().isString(className)) {
			if(len < 1) return _this;
			for(var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
				$(element).attr("class", $(element).attr("class").replace(check, " ").trim());
			}
		} else if(global_fn().isFunction(className)) {
			if(len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				$(element).removeClass(className.call(element, _i, $(element).attr("class")));
			}
		}
		return _this;
	};

	modules.removeAttr = function(_this, attrName) {
		var element,
			len = _this.size();
		for (var _i = 0; _i < len; _i++) {
			element = _this.get(_i);
			element.removeAttribute(attrName);
		}
		return _this;
	};

	return modules;

}
