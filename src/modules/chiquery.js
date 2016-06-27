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
	var nodes = context.querySelectorAll(selector);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;
	return this;
};

chiQuery.fn = chiQueryNodes.prototype = {
	each: function (callback) {
		return core_miscellaneous().each(this, callback);
	},
	get: function (callback) {
		return core_miscellaneous().get(this, callback);
	}
};

window.$ = window.chiQuery = chiQuery;
