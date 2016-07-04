import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.each = function(_this, callback) {
		var len = _this.length;
		for (var _i = 0; _i < len; _i++) {
			var node = _this.get(_i);
			if (callback.call(node, _i, node) === false) {
				break;
			}
		}
		return _this;
	};

	modules.get = function(_this, idx) {
		var len = _this.length,
			node;
		if (TOOL_fn().isNumber(idx)) {
			idx = TOOL_fn().negativeNumberWithinLength(idx, len);
			node = _this[idx];
		} else {
			node = TOOL_fn().nodesToArray(_this);
		}
		return node;
	};

	modules.index = function(_this, element) {
		var returnIdx = -1,
			elements,
			target;
		if (element) {
			elements = _this;
			target = chiQuery(element);
		} else {
			var nodes = [],
				nodeList = _this.parent().children();
			for (var _i = 0; _i < nodeList.length; _i++) {
				nodes.push(nodeList[_i]);
			}
			elements = chiQuery(nodes);
			target = _this;
		}
		elements.each(function(idx) {
			if (this === target.get(0)) {
				returnIdx = idx;
				return false;
			}
		});
		return returnIdx;
	};

	modules.map = function(_this, callback) {
		var arr = [];
		_this.each(function(idx) {
			var node = this,
				returned = callback.call(node, idx, node);
			if (!TOOL_fn().isNull(returned) && !TOOL_fn().isUndefined(returned)) arr.push(returned);
		});
		return arr;
	};

	modules.size = function(_this) {
		return _this.length;
	};

	return modules;

}
