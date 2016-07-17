import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	const modules = {};

	modules.changeStack = (_this, elements, context) => {
		const ret = chiQuery(elements, context);
		ret.history = _this;
		return ret;
	};

	return modules;

}
