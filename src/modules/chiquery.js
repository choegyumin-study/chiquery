"use strict";

import {tool_polyfill} from './tool/polyfill.js';
import {tool_variable} from './tool/variable.js';
import {tool_function} from './tool/function.js';

import {core_miscellaneous} from './core/miscellaneous.js';
import {core_traversing} from './core/traversing.js';

import {pod_attribute} from './pod/attribute.js';
import {pod_event} from './pod/event.js';

tool_polyfill();
tool_variable();

var chiQuery = function (selector, context) {
	return new chiQueryNodes(selector, context);
};

var chiQueryNodes = function (selector, context) {
	if (context) {
		if (tool_function().detectChiQueryNodes(context)) {
			context = context.get();
		} else {
			context = [context];
		}
	} else {
		context = [document];
	}
	var nodes;
	// console.log(''); console.log('');
	// console.log('selector:\r\n', selector);
	if (tool_function().detectNodeItem(selector)) { // NodeItem
		nodes = [selector];
	} else if (typeof selector === 'string') { // String
		nodes = [];
		for(var _i = 0; _i < context.length; _i++) {
			if (selector[0] == "<") {
				// nodes = [createDOM(selector)]
			} else {
				nodes = Array.prototype.slice.call(nodes).concat(Array.prototype.slice.call(context[_i].querySelectorAll(selector)));
			}
		}
	}
	// console.log('nodes:\r\n', nodes);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.isChiQuery = true;
	this.context = context;
	this.length = nodes.length;
	this.selector = selector;
	// console.log('this:\r\n', this);
	return this;
};

chiQuery.fn = chiQueryNodes.prototype = {
	attr: function(attrName, attrValue) {
		return pod_attribute().attr(this, attrName, attrValue);
	},
	each: function(callback) {
		return core_miscellaneous().each(this, callback);
	},
	eq: function(idx) {
		return core_traversing().eq(this, idx);
	},
	get: function(idx) {
		return core_miscellaneous().get(this, idx);
	},
	index: function(element) {
		return core_miscellaneous().index(this, element);
	},
	size: function() {
		return core_miscellaneous().size(this);
	}
};

window.$ = window.chiQuery = chiQuery;
