import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	const modules = {};

	modules.each = (_this, callback) => {
		const len = _this.length;
		for (let _i = 0; _i < len; _i++) {
			const node = _this.get(_i);
			if (callback.call(node, _i, node) === false) {
				break;
			}
		}
		return _this;
	};

	modules.get = (_this, idx) => {
		const len = _this.length;
		let node;
		if (TOOL_fn().isNumber(idx)) {
			idx = TOOL_fn().negativeNumberWithinLength(idx, len);
			node = _this[idx];
		} else {
			node = TOOL_fn().nodesToArray(_this);
		}
		return node;
	};

	modules.index = (_this, element) => {
		let returnIdx = -1, elements, target;
		if (element) {
			elements = _this;
			target = chiQuery(element);
		} else {
			const nodes = [], nodeList = _this.parent().children();
			for (let _i = 0; _i < nodeList.length; _i++) {
				nodes.push(nodeList[_i]);
			}
			elements = chiQuery(nodes);
			target = _this;
		}
		elements.each(function (idx) {
			if (this === target.get(0)) {
				returnIdx = idx;
				return false;
			}
		});
		return returnIdx;
	};

	modules.map = (_this, callback) => {
		const arr = [];
		_this.each(function (idx) {
			const node = this, returned = callback.call(node, idx, node);
			if (!TOOL_fn().isNull(returned) && !TOOL_fn().isUndefined(returned)) arr.push(returned);
		});
		return arr;
	};

	modules.size = _this => _this.length;

	return modules;

}
