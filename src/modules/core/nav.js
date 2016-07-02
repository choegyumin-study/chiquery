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
			var _parent = _this.get(_i).parentNode;
			if (!target || Array.prototype.indexOf.call(target, _parent) > -1) nodes.push(_parent);
		}
		return chiQuery(nodes, _this);
	};

	modules.parents = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var _parent = _this.get(_i).parentNode;
			while (_parent !== null && _parent !== document) {
				if (
					(!target || (Array.prototype.indexOf.call(target, _parent) > -1)) &&
					Array.prototype.indexOf.call(nodes, _parent) < 0
				) nodes.push(_parent);
				_parent = _parent.parentNode;
			}
		}
		return chiQuery(nodes, _this);
	};

	return modules;

}
