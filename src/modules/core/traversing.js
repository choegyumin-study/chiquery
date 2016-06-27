export function core_traversing() {

	"use strict";

	var modules = {};

	modules.eq = function(elements, idx) {
		return chiQuery(elements[idx]);
	};

	return modules;

}
