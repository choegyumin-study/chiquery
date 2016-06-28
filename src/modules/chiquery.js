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
	this.isChiQuery = true;

	var nodes = [];

	if (context) {
		if (tool_fn().detectChiQueryNodes(context)) {
			context = tool_fn().unwrapChiQueryNodes(context);
		} else {
			context = [context];
		}
	} else {
		context = [document];
	}
	this.context = context;

	if (tool_fn().detectNodeItem(selector)) { // NodeItem
		nodes = [selector];
	} else if (typeof selector === 'string') { // String
		for(var _i = 0; _i < context.length; _i++) {
			if (selector[0] == "<") {
				// nodes = [createDOM(selector)];
			} else {
				nodes = tool_fn().unwrapChiQueryNodes(nodes)
					.concat(tool_fn().unwrapChiQueryNodes(context[_i].querySelectorAll(selector)));
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
