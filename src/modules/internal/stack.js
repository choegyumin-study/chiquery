import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.changeStack = function(_this, elements, context) {
		var ret = chiQuery(elements, context);
		ret.history = _this;
		return ret;
	};

	return modules;

}
