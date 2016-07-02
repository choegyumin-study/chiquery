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

	modules.parent = function(elements, target) {
		target = global_fn().nodesToArray(chiQuery(target));
		var nodes = [];
		for(var _i = 0; _i < elements.length; _i++) {
			var parentNode = elements[_i].parentNode;
			if (!target || Array.prototype.indexOf.call(target, parentNode) > -1) {
				nodes = nodes.concat(parentNode);
			}
		}
		return chiQuery(nodes, elements);
	};

	return modules;

}
