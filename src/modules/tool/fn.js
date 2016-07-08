export default function() {

	var modules = {};

	modules.getChildNodesArray = function(obj, target, loop) {
		target = target ? modules.nodesSelector(target) : undefined;
		var nodes = [];
		for (var _i = 0; _i < obj.length; _i++) {
			var childNodes = obj[_i].childNodes;
			var _j = 0;
			while (childNodes !== null && (!loop || loop > _j)) {
				for (var _k = 0; _k < childNodes.length; _k++) {
					var childNode = childNodes[_k];
					if ((!target || target.indexOf(childNode) > -1) && modules.isElementNodeItem(childNode)) {
						nodes.push(childNode);
					}
				}
				childNodes = childNodes.parentNode;
				_j++;
			}
		}
		return nodes;
	};

	modules.getParentNodesArray = function(obj, target, loop) {
		target = target ? modules.nodesSelector(target) : undefined;
		var nodes = [];
		for (var _i = 0; _i < obj.length; _i++) {
			var parentNode = obj[_i].parentNode;
			var _j = 0;
			while (parentNode !== null && parentNode !== document && (!loop || loop > _j)) {
				if (!target || target.indexOf(parentNode) > -1) {
					var hasParentIdx = nodes.indexOf(parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
				}
				parentNode = parentNode.parentNode;
				_j++;
			}
		}
		return nodes;
	};

	modules.getSiblingNodesArray = function(obj, turn, target, loop) {
		function getNodesOfTurn(obj, turn, target, loop) {
			turn = turn === 'prev' ? 'previous' : turn;
			var nodes = [];
			for (var _i = 0; _i < obj.length; _i++) {
				var siblingNode = obj[_i][turn + 'Sibling'];
				var _j = 0;
				while (siblingNode !== null && siblingNode !== document && (!loop || loop > _j)) {
					if (modules.isElementNodeItem(siblingNode)) {
						if ((!target || target.indexOf(siblingNode) > -1)) {
							nodes.push(siblingNode);
						}
						_j++;
					}
					siblingNode = siblingNode[turn + 'Sibling'];
				}
			}
			return nodes;
		}
		turn = turn || 'all';
		target = target ? modules.nodesSelector(target) : undefined;
		var nodes = [];
		if (turn === 'all' || turn === 'prev') nodes = nodes.concat(getNodesOfTurn(obj, 'prev', target, loop));
		if (turn === 'all' || turn === 'next') nodes = nodes.concat(getNodesOfTurn(obj, 'next', target, loop));
		return nodes;
	};

	modules.hasAttr = function(obj, attrName, attrValue) {
		if (modules.isObject(obj)) {
			return modules.regexDetectString(obj, obj.getAttribute(attrName), attrValue);
		}
		return false;
	};

	modules.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	modules.isBoolean = function(obj) {
		return typeof obj === 'boolean';
	};

	modules.ischiQueryComponent = function(obj) {
		return typeof obj === 'object' && obj.isChiQuery;
	};

	modules.isElementNodeItem = function(obj) {
		return modules.isNodeItem(obj) && obj.nodeType === 1;
	};

	modules.isFunction = function(obj) {
		return typeof obj === 'function';
	};

	modules.isNodeItem = function(obj) {
		return typeof obj === 'object' &&
			typeof obj.nodeName === 'string' &&
			typeof obj.nodeType === 'number';
	};

	modules.isNull = function(obj) {
		return obj === null;
	};

	modules.isNumber = function(obj) {
		return typeof obj === 'number';
	};

	modules.isNodeList = function(obj) {
		return typeof obj === 'object' &&
			/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(obj)) &&
			(typeof obj.length === 'number') &&
			(obj.length === 0 || (typeof obj[0] === 'object' && obj[0].nodeType > 0));
	};

	modules.isObject = function(obj) {
		return typeof obj === 'object';
	};

	modules.isObjectWithoutArray = function(obj) {
		return typeof obj === 'object' &&
			Object.prototype.toString.call(obj) !== '[object Array]';
	};

	modules.isString = function(obj) {
		return typeof obj === 'string';
	};

	modules.isUndefined = function(obj) {
		return typeof obj === 'undefined';
	};

	modules.negativeNumberWithinLength = function(idx, len) {
		if (idx < 0) idx = len + idx;
		return idx;
	};

	modules.nodesSelector = function(selector, args) {
		function detectNodeInContext(elements, context) {
			var nodes;
			if (context && context[0] !== document) {
				nodes = [];
				for (var _i = 0; _i < elements.length; _i++) {
					var currentNode = elements[_i],
						parentNode = elements[_i].parentNode;
					while (parentNode !== null && parentNode !== document) {
						if (context.indexOf(parentNode) > -1) {
							nodes.push(currentNode);
							break;
						}
						parentNode = parentNode.parentNode;
					}
				}
			} else {
				nodes = elements;
			}
			return nodes;
		}

		function selectorToNodes(selector, context) {
			var elsType = 'typeError',
				elsList = [];
			if (context === undefined) context = [document];
			if (modules.isArray(context) && context.length > 0) {
				if (modules.ischiQueryComponent(selector)) {
					// console.log('selector is chiQueryComponent.');
					elsType = 'chiQueryComponent';
					elsList = detectNodeInContext(modules.nodesToArray(selector), context);
				} else if (modules.isNodeItem(selector)) {
					// console.log('selector is nodeItem.');
					elsType = 'nodeItem';
					elsList = detectNodeInContext([selector], context);
				} else if (modules.isNodeList(selector)) {
					// console.log('selector is nodeList.');
					elsType = 'nodeList';
					elsList = detectNodeInContext(modules.nodesToArray(selector), context);
				} else if (modules.isArray(selector)) {
					// console.log('selector is array.');
					elsType = 'array';
					elsList = detectNodeInContext(selector, context);
				} else if (modules.isString(selector)) {
					if (args.createDOM && selector[0] === "<") {
						// console.log('selector is HTML string.');
						elsType = 'htmlString';
						var createDOM = document.createElement('body');
						createDOM.innerHTML = selector;
						elsList = modules.nodesToArray(createDOM.childNodes);
					} else {
						// console.log('selector is string.');
						elsType = 'string';
						for (var _i = 0; _i < context.length; _i++) {
							elsList = elsList.concat(modules.nodesToArray(context[_i].querySelectorAll(selector)));
						}
					}
				}
			}
			return {
				list: elsList,
				type: elsType
			};
		}
		args = args || {};
		args.context = args.context ? selectorToNodes(args.context).list : [document];
		args.createDOM = args.createDOM || false;
		var nodes = selectorToNodes(selector, args.context);
		if (args.callback) args.callback.call(nodes.list, nodes.type);
		return nodes.list;
	};

	modules.nodesToArray = function(nodes) {
		var nodesArr = [];
		for (var _i = 0; _i < nodes.length; _i++) {
			nodesArr.push(nodes[_i]);
		}
		return nodesArr;
	};

	modules.regexDetectString = function(obj, value, regexValue) {
		return new RegExp("(\\s|^)" + regexValue + "(\\s|$)").test(value);
	};

	return modules;

}
