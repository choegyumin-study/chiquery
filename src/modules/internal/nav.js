import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.getChildNodesArray = function(_this, target, loop) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var childNodes = this.childNodes;
			var _i = 0;
			while (childNodes !== null && (!loop || loop > _i)) {
				for (var _j = 0; _j < childNodes.length; _j++) {
					var childNode = childNodes[_j];
					if ((!target || target.indexOf(childNode) > -1) && TOOL_fn().isElementNodeItem(childNode)) {
						nodes.push(childNode);
					}
				}
				childNodes = childNodes.parentNode;
				_i++;
			}
		});
		return nodes;
	};

	modules.getParentNodesArray = function(_this, target, loop) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodes = [];
		_this.each(function() {
			var parentNode = this.parentNode;
			var _i = 0;
			while (parentNode !== null && parentNode !== document && (!loop || loop > _i)) {
				if (!target || target.indexOf(parentNode) > -1) {
					var hasParentIdx = nodes.indexOf(parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
				}
				parentNode = parentNode.parentNode;
				_i++;
			}
		});
		return nodes;
	};

	return modules;

}
