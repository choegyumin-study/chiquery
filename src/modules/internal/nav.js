import TOOL_var from '../tool/var.js';
import TOOL_fn from '../tool/fn.js';

export default function() {

	var modules = {};

	modules.getParentNodesArray = function(_this, target, loop) {
		target = target ? TOOL_fn().nodesSelector(target) : undefined;
		var nodesArr = [];
		var _i = 0,
			_j = 0;
		for (; _i < _this.size(); _i++) {
			var parentNode = _this.get(_i).parentNode;
			while (parentNode !== null && parentNode !== document && (!loop || loop > _j)) {
				if (!target || target.indexOf(parentNode) > -1) {
					var hasParentIdx = nodesArr.indexOf(parentNode);
					if (hasParentIdx > -1) nodesArr.splice(hasParentIdx, 1);
					nodesArr.push(parentNode);
				}
				parentNode = parentNode.parentNode;
				_j++;
			}
		}
		return nodesArr;
	};

	return modules;

}
