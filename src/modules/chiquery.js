"use strict";

import {tool_polyfill} from './tool/polyfill.js';
import {core_miscellaneous} from './core/miscellaneous.js';
import {core_traversing} from './core/traversing.js';
import {extend_attributes} from './extend/attributes.js';
import {extend_event} from './extend/event.js';

tool_polyfill();

var chiQuery = function (selector, context) {
	return new chiQueryNodes(selector, context);
};

var chiQueryNodes = function (selector, context) {
	context = context || document;
	var nodes;
	// console.log('');
	// console.log('');
	// console.log('selector:\r\n', selector);
	if (typeof selector === "object" && typeof selector.nodeName==="string" && typeof selector.nodeType === "number") {
		nodes = [selector];
	} else if (typeof selector === 'string') {
		if (selector[0] == "<") {
			// nodes = [createDOM(selector)]
		}
		else {
			nodes = context.querySelectorAll(selector);
		}
	}
	// console.log('nodes:\r\n', nodes);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.context = context;
	this.length = nodes.length;
	this.selector = selector;
	// console.log('this:\r\n', this);
	return this;
};

chiQuery.fn = chiQueryNodes.prototype = {
	get: function (idx) {
		return core_miscellaneous().get(this, idx);
	},
	index: function(element) {
		return core_miscellaneous().index(this, element);
	},
	each: function (callback) {
		return core_miscellaneous().each(this, callback);
	}
};

window.$ = window.chiQuery = chiQuery;
