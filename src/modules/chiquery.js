"use strict";

import {tool_polyfill} from './tool/polyfill.js';
import {tool_var} from './tool/var.js';
import {tool_fn} from './tool/fn.js';

import {core_misc} from './core/misc.js';
import {core_nav} from './core/nav.js';

import {pod_attr} from './pod/attr.js';
import {pod_event} from './pod/event.js';

tool_polyfill();
tool_var();

var chiQuery = function (selector, context) {
	return new chiQueryNodes(selector, context);
};

var chiQueryNodes = function (selector, context) {
	if (context) {
		if (tool_fn().detectChiQueryNodes(context)) {
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
	if (tool_fn().detectNodeItem(selector)) { // NodeItem
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
		return pod_attr().attr(this, attrName, attrValue);
	},
	each: function(callback) {
		return core_misc().each(this, callback);
	},
	eq: function(idx) {
		return core_nav().eq(this, idx);
	},
	get: function(idx) {
		return core_misc().get(this, idx);
	},
	index: function(element) {
		return core_misc().index(this, element);
	},
	size: function() {
		return core_misc().size(this);
	}
};

window.$ = window.chiQuery = chiQuery;
