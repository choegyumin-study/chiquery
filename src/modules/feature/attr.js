import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.addClass = function(_this, className) {
		var element,
			len = _this.size();
		if (TOOL_fn().isString(className)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				if (TOOL_fn().hasAttr(element, "class", className) === false) chiQuery(element).attr("class", chiQuery(element).attr("class") + " " + className);
			}
		} else if (TOOL_fn().isFunction(className)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				if (TOOL_fn().hasAttr(element, "class", className) === false) chiQuery(element).addClass(className.call(element, _i, chiQuery(element).attr("class")));
			}
		}
		return _this;
	};

	modules.attr = function(_this, attrName, attrValue) {
		var element,
			len = _this.size();
		if (TOOL_fn().isUndefined(attrValue)) {
			if (len < 1) return _this;
			return _this.get(0).getAttribute(attrName);
		} else if (TOOL_fn().isString(attrValue)) {
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				element.setAttribute(attrName, attrValue);
			}
			return _this;
		} else if (TOOL_fn().isFunction(attrValue)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				chiQuery(element).attr(attrName, attrValue.call(element, _i, element.getAttribute(attrName)));
			}
			return _this;
		}
		return undefined;
	};

	modules.hasClass = function(_this, className) {
		var element,
			len = _this.size();
		for (var _i = 0; _i < len; _i++) {
			element = _this.get(_i);
			if (TOOL_fn().hasAttr(element, "class", className) === true) {
				return true;
			}
		}
		return false;
	};

	modules.prop = function(_this, propertyName, propertyValue) {
		var element,
			len = _this.size();
		if (TOOL_fn().isObject(propertyName)) {
			if (len < 1) return undefined;
			for (var _i = 0; _i < len; _i++) {
				var propertyObj = Object.keys(propertyName);
				if (propertyObj.length < 1) return _this;
				element = _this.get(_i);
				for (var _j = 0; _j < propertyObj.length; _j++) {
					element[propertyObj[_j]] = propertyName[propertyObj[_j]];
				}
			}
		} else if (TOOL_fn().isUndefined(propertyValue)) {
			return _this.get(0)[propertyName];
		} else if (TOOL_fn().isFunction(propertyValue) === false) {
			if (len < 1) return undefined;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				element[propertyName] = propertyValue;
			}
			return _this;
		} else if (TOOL_fn().isFunction(propertyValue)) {
			if (len < 1) return undefined;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				chiQuery(element).prop(propertyName, propertyValue.call(element, _i, chiQuery(element).prop(propertyName)));
			}
			return _this;
		}
		return undefined;
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

	modules.removeClass = function(_this, className) {
		var element,
			len = _this.size();
		if (TOOL_fn().isString(className)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				var regex = new RegExp("(\\s|^)" + className + "(\\s|$)");
				chiQuery(element).attr("class", chiQuery(element).attr("class").replace(regex, " ").trim());
			}
		} else if (TOOL_fn().isFunction(className)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				chiQuery(element).removeClass(className.call(element, _i, chiQuery(element).attr("class")));
			}
		}
		return _this;
	};

	modules.removeProp = function(_this, propertyName) {
		var element,
			len = _this.size();
		if (len < 1) return undefined;
		for (var _i = 0; _i < len; _i++) {
			element = _this.get(_i);
			element[propertyName] = undefined;
			delete element[propertyName];
		}
		return _this;
	};

	modules.toggleClass = function(_this, className, status) {
		var element,
			len = _this.size();
		if (TOOL_fn().isString(className)) {
			if (len < 1) return _this;
			if (TOOL_fn().isBoolean(status)) {
				if (status === true) {
					chiQuery(element).addClass(className);
				} else {
					chiQuery(element).removeClass(className);
				}
				return _this;
			}
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				if (TOOL_fn().hasAttr(element, "class", className)) {
					chiQuery(element).removeClass(className);
				} else {
					chiQuery(element).addClass(className);
				}
			}
		} else if (TOOL_fn().isFunction(className)) {
			if (len < 1) return _this;
			for (var _i = 0; _i < len; _i++) {
				element = _this.get(_i);
				chiQuery(element).toggleClass(className.call(element, _i, chiQuery(element).attr("class")));
			}
		}
		return _this;
	};

	modules.val = function(_this) {
		var element = _this.get(0);
		if (TOOL_fn().isUndefined(element.value)) {
			return "";
		} else {
			return element.value;
		}
	};

	return modules;

}
