"use strict";

import './tool/polyfill.js';
import tool_var from './tool/var.js';
import tool_fn from './tool/fn.js';

import core_misc from './core/misc.js';
import core_nav from './core/nav.js';

import pod_attr from './pod/attr.js';
import pod_event from './pod/event.js';

var chiQuery = function (selector, context) {
	return new chiQueryNodes(selector, context);
};

var chiQueryNodes = function (selector, context) {
	this.isChiQuery = true;

	var nodes = [];

	if (context) {
		if (tool_fn().isChiQueryNodes(context)) {
			// console.log('context is chiQueryNodes.');
			context = tool_fn().nodesToArray(context);
		} else if (tool_fn().isNodeList(context)) {
			// console.log('context is nodeList.');
			context = context;
		} else if (tool_fn().isNodeItem(context)) {
			// console.log('context is nodeItem.');
			context = [context];
		} else if (typeof context === 'string') {
			// console.log('context is string.');
			context = document.querySelectorAll(context);
		} else {
			// throw 'ReferenceError: ' + context + ' is not defined';
		}
	} else {
		// console.log('context not exist.');
		context = [document];
	}
	this.context = context;

	if (tool_fn().isChiQueryNodes(selector)) {
		// console.log('selector is chiQueryNodes.');
		nodes = tool_fn().nodesToArray(selector);
	} else if (tool_fn().isNodeList(selector)) {
		// console.log('selector is nodeList.');
		nodes = selector;
	} else if (tool_fn().isNodeItem(selector)) {
		// console.log('selector is nodeItem.');
		nodes = [selector];
	} else if (typeof selector === 'string') {
		if (selector[0] == "<") {
			// console.log('selector is HTML string.');
			var createDOM = document.createElement('body');
			createDOM.innerHTML = selector;
			nodes = createDOM.childNodes;
		} else {
			// console.log('selector is string.');
			for(var _i = 0; _i < context.length; _i++) {
				nodes = nodes.concat(tool_fn().nodesToArray(context[_i].querySelectorAll(selector)));
			}
		}
		this.selector = selector;
	}

	this.length = nodes.length;

	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}

	return this;
};

chiQuery.fn = chiQueryNodes.prototype = {
	attr: function(attrName, attrValue) {
		return pod_attr().attr(this, attrName, attrValue);
	},
	each: function(callback) {
		return core_misc().each(this, callback);
	},
	eq: function(idx) {
		return core_nav().eq(this, idx);
	},
	find: function(selector) {
		return core_nav().find(this, selector);
	},
	get: function(idx) {
		return core_misc().get(this, idx);
	},
	index: function(element) {
		return core_misc().index(this, element);
	},
	parent: function(element) {
		return core_nav().parent(this, element);
	},
	size: function() {
		return core_misc().size(this);
	}
};

window.$ = window.chiQuery = chiQuery;
