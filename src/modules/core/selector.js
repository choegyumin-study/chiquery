import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function(_this, selector, context) {

	context = context ? TOOL_fn().nodesSelector(context) : [document];
	var nodes = TOOL_fn().nodesSelector(selector, {
		context: context,
		createDOM: true,
		callback: function(selectorType) {
			if (selectorType === 'string') _this.selector = selector;
		}
	});

	for (var _i = 0; _i < nodes.length; _i++) {
		_this[_i] = nodes[_i];
	}

	_this.context = context;
	_this.isChiQuery = true;
	_this.length = nodes.length;

	return _this;

}
