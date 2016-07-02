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
		target = global_fn().nodesToArray(chiQuery(target));
		var nodes = [];
		for (var _i = 0; _i < _this.length; _i++) {
			var parentNode = _this[_i].parentNode;
			if (!target || Array.prototype.indexOf.call(target, parentNode) > -1) {
				nodes = nodes.concat(parentNode);
			}
		}
		return chiQuery(nodes, _this);
	};

	return modules;

}
