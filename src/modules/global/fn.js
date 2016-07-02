export default function() {

	var modules = {};

	modules.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	modules.isBoolean = function(obj) {
		return typeof obj === 'boolean';
	};

	modules.isChiQueryNodes = function(obj) {
		return typeof obj === 'object' && obj.isChiQuery;
	};

	modules.isFunction = function(obj) {
		return typeof obj === 'function';
	};

	modules.isNodeItem = function(obj) {
		return typeof obj === 'object' &&
			typeof obj.nodeName === 'string' &&
			typeof obj.nodeType === 'number';
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

	modules.isString = function(obj) {
		return typeof obj === 'string';
	};

	modules.isUndefined = function(obj) {
		return typeof obj === 'undefined';
	};

	modules.nodesToArray = function(nodes) {
		var nodesArr = [];
		for (var _i = 0; _i < nodes.length; _i++) {
			nodesArr.push(nodes[_i]);
		}
		return nodesArr;
	};

	return modules;

}
