"use strict";

import {tool_polyfill} from './tool/polyfill.js';
import {core_traversing} from './core/traversing.js';
import {extend_attributes} from './extend/attributes.js';
import {extend_event} from './extend/event.js';

let a = 1;
if (a) {
	let a = 2;
	console.log(a);
}
var i = 100;
for (let i in [1]) {
	console.log(i);
}
console.log(i);

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
		return core_traversing().each(this, callback);
	}
};

window.$ = window.chiQuery = chiQuery;
