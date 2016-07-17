import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	const modules = {};

	modules.add = (_this, selector, context) => {
		context = context || document;
		const nodes = TOOL_fn().nodesToArray(_this).concat(TOOL_fn().nodesSelector(selector, {
			context,
			createDOM: true
		}));
		return _this._changeStack(nodes);
	};

	modules.children = (_this, target) => {
		const nodes = TOOL_fn().getChildNodesArray(_this, target, 1);
		return _this._changeStack(nodes);
	};

	modules.closest = (_this, target, context) => {
		target = TOOL_fn().nodesSelector(target);
		const nodes = [];
		_this.each(function () {
			let parentNode = this;
			while (parentNode !== null && parentNode !== document && TOOL_fn().nodesSelector(context).indexOf(parentNode) < 0) {
				if (target.indexOf(parentNode) > -1) {
					const hasParentIdx = nodes.indexOf(parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
					break;
				}
				parentNode = parentNode.parentNode;
			}
		});
		return _this._changeStack(nodes);
	};

	modules.end = _this => _this.history;

	modules.eq = (_this, idx) => {
		const len = _this.size();
		idx = TOOL_fn().negativeNumberWithinLength(idx, len);
		return _this._changeStack(_this.get(idx));
	};

	modules.filter = (_this, target) => {
		const nodes = [];
		if (TOOL_fn().isFunction(target)) {
			_this.each(function (idx) {
				const node = this;
				if (target.call(node, idx, node)) {
					nodes.push(node);
				}
			});
		} else {
			target = TOOL_fn().nodesSelector(target);
			_this.each(function () {
				const node = this;
				if (!target || target.indexOf(node) > -1) nodes.push(node);
			});
		}
		return _this._changeStack(nodes);
	};

	modules.find = (_this, selector) => _this._changeStack(selector, _this);

	modules.first = _this => _this._changeStack(_this.get(0));

	modules.has = (_this, selector) => {
		const nodes = [];
		_this.each(function () {
			const node = this;
			if (chiQuery(selector, node).size() > 0) nodes.push(node);
		});
		return _this._changeStack(nodes);
	};

	modules.is = (_this, target) => {
		let returnBool = false;
		if (TOOL_fn().isFunction(target)) {
			_this.each(function (idx) {
				const node = this;
				if (target.call(node, idx, node)) {
					returnBool = true;
					return false;
				}
			});
			return returnBool;
		} else {
			target = TOOL_fn().nodesSelector(target);
			if (TOOL_fn().isArray(target)) {
				_this.each(function () {
					const node = this;
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

	modules.last = _this => _this._changeStack(_this.get(-1));

	modules.next = (_this, target) => {
		const nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target, 1);
		return _this._changeStack(nodes);
	};

	modules.nextAll = (_this, target) => {
		const nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target);
		return _this._changeStack(nodes);
	};

	modules.not = (_this, target) => {
		const nodes = [];
		if (TOOL_fn().isFunction(target)) {
			_this.each(function (idx) {
				const node = this;
				if (!target.call(node, idx, node)) {
					nodes.push(node);
				}
			});
		} else {
			target = TOOL_fn().nodesSelector(target);
			_this.each(function () {
				const node = this;
				if (!target || target.indexOf(node) < 0) nodes.push(node);
			});
		}
		return _this._changeStack(nodes);
	};

	modules.parent = (_this, target) => {
		const nodes = TOOL_fn().getParentNodesArray(_this, target, 1);
		return _this._changeStack(nodes);
	};

	modules.parents = (_this, target) => {
		const nodes = TOOL_fn().getParentNodesArray(_this, target);
		return _this._changeStack(nodes);
	};

	modules.prev = (_this, target) => {
		const nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target, 1);
		return _this._changeStack(nodes);
	};

	modules.prevAll = (_this, target) => {
		const nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target);
		return _this._changeStack(nodes);
	};

	modules.siblings = (_this, target) => {
		const nodes = TOOL_fn().getSiblingNodesArray(_this, 'all', target);
		return _this._changeStack(nodes);
	};

	modules.slice = (_this, start, end) => {
		const nodes = [], len = _this.size();
		start = TOOL_fn().negativeNumberWithinLength(start, len);
		end = TOOL_fn().negativeNumberWithinLength(end, len);
		_this.filter(function (idx) {
			if (idx >= start && (!end || idx < end)) nodes.push(this);
		});
		return _this._changeStack(nodes);
	};

	return modules;

}
