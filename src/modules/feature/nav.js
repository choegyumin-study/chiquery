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
		return _this._changeStack(nodes, context);
	};

	modules.children = function(_this, target) {
		var nodes = TOOL_fn().getChildNodesArray(_this, target, 1);
		return _this._changeStack(nodes, _this);
	};

	modules.closest = function(_this, target, context) {
		target = TOOL_fn().nodesSelector(target);
		var nodes = [];
		_this.each(function() {
			var parentNode = this;
			while (parentNode !== null && parentNode !== document && TOOL_fn().nodesSelector(context).indexOf(parentNode) < 0) {
				if (target.indexOf(parentNode) > -1) {
					nodes.push(parentNode);
					break;
				}
				parentNode = parentNode.parentNode;
			}
		});
		return _this._changeStack(nodes, _this);
	};

	modules.end = function(_this) {
		return _this.history;
	};

	modules.eq = function(_this, idx) {
		var len = _this.length;
		idx = TOOL_fn().negativeNumberWithinLength(idx, len);
		return _this._changeStack(_this.get(idx), _this);
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
		return _this._changeStack(nodes, _this);
	};

	modules.find = function(_this, selector) {
		return _this._changeStack(selector, _this);
	};

	modules.first = function(_this) {
		return _this._changeStack(_this.get(0), _this);
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
		return _this._changeStack(_this.get(-1), _this);
	};

	modules.next = function(_this, target) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var nextNode = this.nextSibling;
			while (nextNode !== null && nextNode !== document) {
				if ((!target || target.indexOf(nextNode) > -1) && TOOL_fn().isElementNodeItem(nextNode)) {
					nodes.push(nextNode);
					break;
				}
				nextNode = nextNode.nextSibling;
			}
		});
		return _this._changeStack(nodes, _this);
	};

	modules.nextAll = function(_this, target) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var nextNode = this.nextSibling;
			while (nextNode !== null && nextNode !== document) {
				if ((!target || target.indexOf(nextNode) > -1) && TOOL_fn().isElementNodeItem(nextNode)) {
					nodes.push(nextNode);
				}
				nextNode = nextNode.nextSibling;
			}
		});
		return _this._changeStack(nodes, _this);
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
		return _this._changeStack(nodes, _this);
	};

	modules.parent = function(_this, target) {
		var nodes = TOOL_fn().getParentNodesArray(_this, target, 1);
		return _this._changeStack(nodes, _this);
	};

	modules.parents = function(_this, target) {
		var nodes = TOOL_fn().getParentNodesArray(_this, target);
		return _this._changeStack(nodes, _this);
	};

	modules.prev = function(_this, target) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var prevNode = this.previousSibling;
			while (prevNode !== null && prevNode !== document) {
				if ((!target || target.indexOf(prevNode) > -1) && TOOL_fn().isElementNodeItem(prevNode)) {
					nodes.push(prevNode);
					break;
				}
				prevNode = prevNode.previousSibling;
			}
		});
		return _this._changeStack(nodes, _this);
	};

	modules.prevAll = function(_this, target) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var prevNode = this.previousSibling;
			while (prevNode !== null && prevNode !== document) {
				if ((!target || target.indexOf(prevNode) > -1) && TOOL_fn().isElementNodeItem(prevNode)) {
					nodes.push(prevNode);
				}
				prevNode = prevNode.previousSibling;
			}
		});
		return _this._changeStack(nodes, _this);
	};

	modules.siblings = function(_this, target) {
		return _this._changeStack(TOOL_fn().nodesToArray(_this.prevAll(target || undefined)).concat(TOOL_fn().nodesToArray(_this.nextAll(target || undefined))), _this);
	};

	modules.slice = function(_this, start, end) {
		var nodes = [],
			len = _this.size();
		start = TOOL_fn().negativeNumberWithinLength(start, len);
		end = TOOL_fn().negativeNumberWithinLength(end, len);
		_this.filter(function(idx) {
			if (idx >= start && (!end || idx < end)) nodes.push(this);
		});
		return _this._changeStack(nodes, _this);
	};

	return modules;

}
