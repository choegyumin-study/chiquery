import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.eq = function(_this, idx) {
		var len = _this.length;
		if (idx < 0) idx = len + idx;
		return chiQuery(_this[idx], _this);
	};

	modules.find = function(_this, selector) {
		return chiQuery(selector, _this);
	};

	modules.parent = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i).parentNode;
			if (!target || Array.prototype.indexOf.call(target, parentNode) > -1) nodes.push(parentNode);
		}
		return chiQuery(nodes, _this);
	};

	modules.parents = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i).parentNode;
			while (parentNode !== null && parentNode !== document) {
				if (!target || Array.prototype.indexOf.call(target, parentNode) > -1) {
					var hasParentIdx = Array.prototype.indexOf.call(nodes, parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
				}
				parentNode = parentNode.parentNode;
			}
		}
		return chiQuery(nodes, _this);
	};

	return modules;

}
