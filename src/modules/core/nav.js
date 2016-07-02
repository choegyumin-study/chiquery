import global_var from '../global/var.js';
import global_fn from '../global/fn.js';

export default function() {

	var modules = {};

	modules.add = function(_this, selector, context) {
		context = context || document;
		return chiQuery(global_fn().nodesToArray(_this).concat(global_fn().nodesToArray(chiQuery(selector, context))), _this);
	};

	modules.children = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var childNodes = _this.get(_i).childNodes;
			for (var _j = 0; _j < childNodes.length; _j++) {
				var childNode = childNodes[_j];
				if (
					(!target || target.indexOf(childNode) > -1) &&
					childNode.nodeType === 1
				) nodes.push(childNode);
			}
		}
		return chiQuery(nodes, _this);
	};

	modules.closest = function(_this, target, context) {
		target = global_fn().nodesToArray(chiQuery(target));
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i);
			while (parentNode !== null && parentNode !== document && global_fn().nodesToArray(chiQuery(context)).indexOf(parentNode) < 0) {
				if (target.indexOf(parentNode) > -1) {
					nodes.push(parentNode);
					break;
				}
				parentNode = parentNode.parentNode;
			}
		}
		return chiQuery(nodes, _this);
	};

	modules.end = function(_this) {
		return chiQuery(_this.context, _this);
	};

	modules.eq = function(_this, idx) {
		var len = _this.length;
		if (idx < 0) idx = len + idx;
		return chiQuery(_this[idx], _this);
	};

	modules.filter = function(_this, target) {
		// console.log('_this:', _this);
		// console.log('target:', target);
		var nodes = [];
		if (global_fn().isFunction(target)) {
			// console.log('target is function.');
			// _this.each(function () {
			// 	console.log(this);
			// });
		} else {
			// console.log('target exists.');
			target = global_fn().nodesToArray(chiQuery(target));
			// console.log('target (converted):', target);
			_this.each(function () {
				// console.log('each:', this);
				if (!target || target.indexOf(this) > -1) nodes.push(this);
			});
		}
		return chiQuery(nodes, _this);
	};

	modules.find = function(_this, selector) {
		return chiQuery(selector, _this);
	};

	modules.first = function(_this) {
		return chiQuery(_this.get(0), _this);
	};

	modules.has = function(_this, selector) {
		var nodes = [],
			len = _this.size();
		for (var _i = 0; _i < len; _i++) {
			var element = _this.get(_i);
			if (chiQuery(selector, element).size() > 0) nodes.push(element);
		}
		return chiQuery(nodes);
	};

	modules.is = function(_this, target) {
		var returnBool = false,
			len = _this.size();
		if (global_fn().isFunction(target)) {
			for (var _i = 0; _i < len; _i++) {
				var element = _this.get(_i);
				if (target.call(element, _i, element)) {
					returnBool = true;
					break;
				}
			}
			return returnBool;
		} else {
			target = global_fn().nodesToArray(chiQuery(target));
			if (global_fn().isArray(target)) {
				for (var _i = 0; _i < len; _i++) {
					if (target.indexOf(_this.get(_i)) > -1) {
						returnBool = true;
						break;
					}
				}
				return returnBool;
			} else {
				return returnBool;
			}
		}
	};

	modules.last = function(_this) {
		return chiQuery(_this.get(-1), _this);
	};

	modules.parent = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i).parentNode;
			if (!target || target.indexOf(parentNode) > -1) nodes.push(parentNode);
		}
		return chiQuery(nodes, _this);
	};

	modules.parents = function(_this, target) {
		target = target ? global_fn().nodesToArray(chiQuery(target)) : undefined;
		var nodes = [];
		for (var _i = 0; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i).parentNode;
			while (parentNode !== null && parentNode !== document) {
				if (!target || target.indexOf(parentNode) > -1) {
					var hasParentIdx = nodes.indexOf(parentNode);
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
