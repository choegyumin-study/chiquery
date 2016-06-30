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
	
	modules.parent = function(context, element) {
		// var node;
		// if (element) node = element.get(0).parentNode;
		// else node = context.get(0).parentNode;
		// // console.log(chiQuery(node));
		// return node;
	};

	return modules;

}
