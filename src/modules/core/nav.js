export function core_nav() {

	var modules = {};

	modules.eq = function(elements, idx) {
		return chiQuery(elements[idx]);
	};

	return modules;

}
