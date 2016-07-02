import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};
	
	modules.attr = function(elements, attrName, attrValue) {
		var len = elements.length;
		if(global_fn().isUndefined(attrValue)) {
			return elements[0].getAttribute(attrName);
		} else if(typeof attrValue == "string") {
			for(var _i = 0; _i < len; _i++) {
				elements[0].setAttribute(attrName, attrValue);
			}
		} else if(typeof attrValue == "function") {
			for (var _i = 0; _i < len; _i++) {
				var element = elements[_i];
				attrValue.call(element, _i, element.getAttribute(attrName));
			}
		}
	};

	return modules;

}
