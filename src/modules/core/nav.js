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

	return modules;

}
