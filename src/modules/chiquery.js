"use strict";

import './global/polyfill.js';
import global_var from './global/var.js';
import global_fn from './global/fn.js';

import core_misc from './core/misc.js';
import core_nav from './core/nav.js';

import pod_attr from './pod/attr.js';
import pod_event from './pod/event.js';

var chiQueryInit = function(selector, context) {
	return new chiQueryNodes(selector, context);
};

var chiQueryNodes = function(selector, context) {
	this.isChiQuery = true;

	var nodes = [];

	if (context) {
		if (global_fn().isChiQueryNodes(context)) {
			// console.log('context is chiQueryNodes.');
			context = global_fn().nodesToArray(context);
		} else if (global_fn().isNodeItem(context)) {
			// console.log('context is nodeItem.');
			context = [context];
		} else if (global_fn().isArray(context)) { // } else if (global_fn().isNodeList(context)) {
			// console.log('context is array.'); // console.log('context is nodeList.');
			context = global_fn().nodesToArray(context);
		} else if (global_fn().isString(context)) {
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

	if (global_fn().isChiQueryNodes(selector)) {
		// console.log('selector is chiQueryNodes.');
		nodes = global_fn().nodesToArray(selector);
	} else if (global_fn().isNodeItem(selector)) {
		// console.log('selector is nodeItem.');
		nodes = [selector];
	} else if (global_fn().isArray(selector)) { // } else if (global_fn().isNodeList(selector)) {
		// console.log('selector is array.'); // console.log('selector is nodeList.');
		nodes = /*global_fn().nodesToArray(*/ selector /*)*/ ;
	} else if (global_fn().isString(selector)) {
		if (selector[0] == "<") {
			// console.log('selector is HTML string.');
			var createDOM = document.createElement('body');
			createDOM.innerHTML = selector;
			nodes = /*global_fn().nodesToArray(*/ createDOM.childNodes /*)*/ ;
		} else {
			// console.log('selector is string.');
			for (var _i = 0; _i < context.length; _i++) {
				nodes = nodes.concat(global_fn().nodesToArray(context[_i].querySelectorAll(selector)));
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

chiQueryInit.fn = chiQueryNodes.prototype = {
	add: function(selector, context) {
		return core_nav().add(this, selector, context);
	},
	addClass: function(className) {
		return pod_attr().addClass(this, className);
	},
	attr: function(attrName, attrValue) {
		return pod_attr().attr(this, attrName, attrValue);
	},
	children: function(targetElement) {
		return core_nav().children(this, targetElement);
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
	first: function() {
		return core_nav().first(this);
	},
	has: function(selector) {
		return core_nav().has(this, selector);
	},
	is: function(target) {
		return core_nav().is(this, target);
	},
	last: function() {
		return core_nav().last(this);
	},
	get: function(idx) {
		return core_misc().get(this, idx);
	},
	index: function(element) {
		return core_misc().index(this, element);
	},
	parent: function(targetElement) {
		return core_nav().parent(this, targetElement);
	},
	parents: function(targetElement) {
		return core_nav().parents(this, targetElement);
	},
	removeAttr: function(attrName) {
		return pod_attr().removeAttr(this, attrName);
	},
	removeClass: function(className) {
		return pod_attr().removeClass(this, className);
	},
	size: function() {
		return core_misc().size(this);
	}
};

window.$ = window.chiQuery = chiQueryInit;
