import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.eq = function(elements, idx) {
		var len = elements.length;
		if (idx < 0) idx = len + idx;
		return chiQuery(elements[idx], elements);
	};

	modules.find = function(context, selector) {
		return chiQuery(selector, context);
	};

	modules.parent = function(elements, element) {
		var nodes = [];
		
		for(var _i = 0; _i < elements.length; _i++) {
			var parentNode = elements[_i].parentNode;
			if (!element) {
				nodes = nodes.concat(parentNode);
			}
		}

		// console.log(nodes);
		return chiQuery(nodes, elements);
	};

	return modules;

}
