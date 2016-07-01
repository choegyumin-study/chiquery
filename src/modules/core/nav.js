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
		// console.log(elements);
		// console.log(element);
		//
		// var nodes = [];
		//
		// for(var _i = 0; _i < elements.length; _i++) {
		// 	var aaaa = elements[_i].parentNode;
		// 	console.log(aaaa);
		// 	//if (!element) nodes = nodes.concat(fn.nodesToArray(aaaa));
		// }
		//
		// // console.log(chiQuery(nodes));
		// return nodes;
	};

	return modules;

}
