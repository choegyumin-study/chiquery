export function core_nav() {

	var modules = {};

	modules.eq = function(elements, idx) {
		var len = elements.length;
		if (idx < 0) idx = len + idx;
		return chiQuery(elements[idx]);
	};

	return modules;

}
