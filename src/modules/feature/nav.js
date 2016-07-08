import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.add = function(_this, selector, context) {
		context = context || document;
		var nodes = TOOL_fn().nodesToArray(_this).concat(TOOL_fn().nodesSelector(selector, {
			context: context,
			createDOM: true
		}));
		return _this._changeStack(nodes);
	};

	modules.children = function(_this, target) {
		var nodes = TOOL_fn().getChildNodesArray(_this, target, 1);
		return _this._changeStack(nodes);
	};

	modules.closest = function(_this, target, context) {
		target = TOOL_fn().nodesSelector(target);
		var nodes = [];
		_this.each(function() {
			var parentNode = this;
			while (parentNode !== null && parentNode !== document && TOOL_fn().nodesSelector(context).indexOf(parentNode) < 0) {
				if (target.indexOf(parentNode) > -1) {
					var hasParentIdx = nodes.indexOf(parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
					break;
				}
				parentNode = parentNode.parentNode;
			}
		});
		return _this._changeStack(nodes);
	};

	modules.end = function(_this) {
		return _this.history;
	};

	modules.eq = function(_this, idx) {
		var len = _this.length;
		idx = TOOL_fn().negativeNumberWithinLength(idx, len);
		return _this._changeStack(_this.get(idx));
	};

	modules.filter = function(_this, target) {
		var nodes = [];
		if (TOOL_fn().isFunction(target)) {
			_this.each(function(idx) {
				var node = this;
				if (target.call(node, idx, node)) {
					nodes.push(node);
				}
			});
		} else {
			target = TOOL_fn().nodesSelector(target);
			_this.each(function() {
				var node = this;
				if (!target || target.indexOf(node) > -1) nodes.push(node);
			});
		}
		return _this._changeStack(nodes);
	};

	modules.find = function(_this, selector) {
		return _this._changeStack(selector, _this);
	};

	modules.first = function(_this) {
		return _this._changeStack(_this.get(0));
	};

	modules.has = function(_this, selector) {
		var nodes = [];
		_this.each(function() {
			var node = this;
			if (chiQuery(selector, node).size() > 0) nodes.push(node);
		});
		return _this._changeStack(nodes);
	};

	modules.is = function(_this, target) {
		var returnBool = false;
		if (TOOL_fn().isFunction(target)) {
			_this.each(function(idx) {
				var node = this;
				if (target.call(node, idx, node)) {
					returnBool = true;
					return false;
				}
			});
			return returnBool;
		} else {
			target = TOOL_fn().nodesSelector(target);
			if (TOOL_fn().isArray(target)) {
				_this.each(function() {
					var node = this;
					if (target.indexOf(node) > -1) {
						returnBool = true;
						return false;
					}
				});
				return returnBool;
			} else {
				return returnBool;
			}
		}
	};

	modules.last = function(_this) {
		return _this._changeStack(_this.get(-1));
	};

	modules.next = function(_this, target) {
		var nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target, 1);
		return _this._changeStack(nodes);
	};

	modules.nextAll = function(_this, target) {
		var nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target);
		return _this._changeStack(nodes);
	};

	modules.not = function(_this, target) {
		var nodes = [];
		if (TOOL_fn().isFunction(target)) {
			_this.each(function(idx) {
				var node = this;
				if (!target.call(node, idx, node)) {
					nodes.push(node);
				}
			});
		} else {
			target = TOOL_fn().nodesSelector(target);
			_this.each(function() {
				var node = this;
				if (!target || target.indexOf(node) < 0) nodes.push(node);
			});
		}
		return _this._changeStack(nodes);
	};

	modules.parent = function(_this, target) {
		var nodes = TOOL_fn().getParentNodesArray(_this, target, 1);
		return _this._changeStack(nodes);
	};

	modules.parents = function(_this, target) {
		var nodes = TOOL_fn().getParentNodesArray(_this, target);
		return _this._changeStack(nodes);
	};

	modules.prev = function(_this, target) {
		var nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target, 1);
		return _this._changeStack(nodes);
	};

	modules.prevAll = function(_this, target) {
		var nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target);
		return _this._changeStack(nodes);
	};

	modules.siblings = function(_this, target) {
		var nodes = TOOL_fn().getSiblingNodesArray(_this, 'all', target);
		return _this._changeStack(nodes);
	};

	modules.slice = function(_this, start, end) {
		var nodes = [],
			len = _this.size();
		start = TOOL_fn().negativeNumberWithinLength(start, len);
		end = TOOL_fn().negativeNumberWithinLength(end, len);
		_this.filter(function(idx) {
			if (idx >= start && (!end || idx < end)) nodes.push(this);
		});
		return _this._changeStack(nodes);
	};

	return modules;

}
