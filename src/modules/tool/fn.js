export default function() {

	const modules = {};

	modules.getChildNodesArray = (obj, target, loop) => {
		target = target ? modules.nodesSelector(target) : undefined;
		const nodes = [];
		for (let _i = 0; _i < obj.length; _i++) {
			let childNodes = obj[_i].childNodes;
			let _j = 0;
			while (childNodes !== null && (!loop || loop > _j)) {
				for (let _k = 0; _k < childNodes.length; _k++) {
					const childNode = childNodes[_k];
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

	modules.getParentNodesArray = (obj, target, loop) => {
		target = target ? modules.nodesSelector(target) : undefined;
		const nodes = [];
		for (let _i = 0; _i < obj.length; _i++) {
			let parentNode = obj[_i].parentNode;
			let _j = 0;
			while (parentNode !== null && parentNode !== document && (!loop || loop > _j)) {
				if (!target || target.indexOf(parentNode) > -1) {
					const hasParentIdx = nodes.indexOf(parentNode);
					if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
					nodes.push(parentNode);
				}
				parentNode = parentNode.parentNode;
				_j++;
			}
		}
		return nodes;
	};

	modules.getSiblingNodesArray = (obj, turn, target, loop) => {
		function getNodesOfTurn(obj, turn, target, loop) {
			turn = turn === 'prev' ? 'previous' : turn;
			const nodes = [];
			for (let _i = 0; _i < obj.length; _i++) {
				let siblingNode = obj[_i][`${turn}Sibling`];
				let _j = 0;
				while (siblingNode !== null && siblingNode !== document && (!loop || loop > _j)) {
					if (modules.isElementNodeItem(siblingNode)) {
						if (!target || target.indexOf(siblingNode) > -1) {
							nodes.push(siblingNode);
						}
						_j++;
					}
					siblingNode = siblingNode[`${turn}Sibling`];
				}
			}
			return nodes;
		}
		turn = turn || 'all';
		target = target ? modules.nodesSelector(target) : undefined;
		let nodes = [];
		if (turn === 'all' || turn === 'prev') nodes = nodes.concat(getNodesOfTurn(obj, 'prev', target, loop));
		if (turn === 'all' || turn === 'next') nodes = nodes.concat(getNodesOfTurn(obj, 'next', target, loop));
		return nodes;
	};

	modules.hasAttr = (obj, attrName, attrValue) => {
		if (modules.isObject(obj)) {
			return modules.regexDetectString(obj, obj.getAttribute(attrName), attrValue);
		}
		return false;
	};

	modules.isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

	modules.isBoolean = obj => typeof obj === 'boolean';

	modules.ischiQueryComponent = obj => typeof obj === 'object' && obj.isChiQuery;

	modules.isElementNodeItem = obj => modules.isNodeItem(obj) && obj.nodeType === 1;

	modules.isFunction = obj => typeof obj === 'function';

	modules.isNodeItem = obj => typeof obj === 'object' && typeof obj.nodeName === 'string' && typeof obj.nodeType === 'number';

	modules.isNull = obj => obj === null;

	modules.isNumber = obj => typeof obj === 'number';

	modules.isNodeList = obj => typeof obj === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(obj)) && (typeof obj.length === 'number') && (obj.length === 0 || (typeof obj[0] === 'object' && obj[0].nodeType > 0));

	modules.isObject = obj => typeof obj === 'object';

	modules.isObjectWithoutArray = obj => typeof obj === 'object' && Object.prototype.toString.call(obj) !== '[object Array]';

	modules.isString = obj => typeof obj === 'string';

	modules.isUndefined = obj => typeof obj === 'undefined';

	modules.negativeNumberWithinLength = (idx, len) => {
		if (idx < 0) idx = len + idx;
		return idx;
	};

	modules.nodesSelector = (selector, args) => {
		function detectNodeInContext(elements, context) {
			let nodes;
			if (context && context[0] !== document) {
				nodes = [];
				for (let _i = 0; _i < elements.length; _i++) {
					const currentNode = elements[_i];
					let parentNode = elements[_i].parentNode;
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
			let elsType = 'typeError', elsList = [];
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
						const createDOM = document.createElement('body');
						createDOM.innerHTML = selector;
						elsList = modules.nodesToArray(createDOM.childNodes);
					} else {
						// console.log('selector is string.');
						elsType = 'string';
						for (let _i = 0; _i < context.length; _i++) {
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
		const nodes = selectorToNodes(selector, args.context);
		if (args.callback) args.callback.call(nodes.list, nodes.type);
		return nodes.list;
	};

	modules.nodesToArray = nodes => {
		const nodesArr = [];
		for (let _i = 0; _i < nodes.length; _i++) {
			nodesArr.push(nodes[_i]);
		}
		return nodesArr;
	};

	modules.regexDetectString = (obj, value, regexValue) => new RegExp(`(\\s|^)${regexValue}(\\s|$)`).test(value);

	return modules;

}
