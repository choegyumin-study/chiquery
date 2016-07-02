import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.each = function(_this, callback) {
		var len = _this.length;
		for (var _i = 0; _i < len; _i++) {
			var element = _this.get(_i);
			if (callback.call(element, _i, element) === false) {
				break;
			}
		}
		return _this;
	};

	modules.get = function(_this, idx) {
		var len = _this.length,
			element;
		if (global_fn().isNumber(idx)) {
			if (idx < 0) idx = len + idx;
			element = _this[idx];
		} else {
			element = global_fn().nodesToArray(_this);
		}
		return element;
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
				nodeList = _this.get(0).parentNode.childNodes;
			for (var _i = 0; _i < nodeList.length; _i++) {
				var nodeItem = nodeList[_i];
				if (nodeItem.nodeType === 1) nodes.push(nodeItem);
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

	modules.size = function(_this) {
		return _this.length;
	};

	return modules;

}
