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
		args = args || {};
		args.context = args.context || document;
		args.createDOM = args.createDOM || false;
		var nodes,
			/**
			 * @todo Add context filter
			 */
			converter = function(element, context) {
				context = context || [document];
				var elementList = [],
					elementType = '';
				if (modules.ischiQueryComponent(element)) {
					// console.log('element is chiQueryComponent.');
					elementType = 'chiQueryComponent';
					elementList = modules.nodesToArray(element);
					// if (context) {
					// 	console.log('context exists!');
					// 	console.log(elementList);
					// }
				} else if (modules.isNodeItem(element)) {
					// console.log('element is nodeItem.');
					elementType = 'nodeItem';
					elementList = [element];
				} else if (modules.isNodeList(element)) {
					// console.log('element is nodeList.');
					elementType = 'nodeList';
					elementList = modules.nodesToArray(element);
				} else if (modules.isArray(element)) {
					// console.log('element is array.');
					elementType = 'array';
					elementList = element;
				} else if (modules.isString(element)) {
					if (args.createDOM && element[0] === "<") {
						// console.log('element is HTML string.');
						elementType = 'htmlString';
						var createDOM = document.createElement('body');
						createDOM.innerHTML = element;
						elementList = modules.nodesToArray(createDOM.childNodes);
					} else {
						// console.log('element is string.');
						elementType = 'string';
						for (var _i = 0; _i < context.length; _i++) {
							elementList = elementList.concat(modules.nodesToArray(context[_i].querySelectorAll(element)));
						}
					}
				}
				return {
					list: elementList,
					type: elementType
				};
			};
		args.context = converter(args.context).list;
		nodes = converter(selector, args.context);
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
