import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.text = function(_this, text) {
		_this.get(0).innerText = text;
		return _this;
	};

	return modules;

}
