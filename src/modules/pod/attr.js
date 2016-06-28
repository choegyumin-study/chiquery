export function pod_attr() {

	var modules = {};
	
	modules.attr = function(elements, attrName, attrValue) {
		if(typeof attrValue == "undefined") {
			return elements[0].getAttribute(attrName);
		} else if(typeof attrValue == "string") {
			var len = elements.length;
			for(var _i = 0; _i < len; _i++) {
				elements[0].setAttribute(attrName, attrValue);
			}
		} else if(typeof attrValue == "function") {
			var len = elements.length;
			for (var _i = 0; _i < len; _i++) {
				var element = elements[_i];
				attrValue.call(element, _i, elements[_i].getAttribute(attrName));
			}
		}
	};

	return modules;

}
