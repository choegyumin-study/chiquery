"use strict";

import './tool/polyfill.js';
import TOOL_var from './tool/var.js';
import TOOL_fn from './tool/fn.js';

import CORE_selector from './core/selector.js';

import INTERNAL_stack from './internal/stack.js';

import FEATURE_misc from './feature/misc.js';
import FEATURE_nav from './feature/nav.js';
import FEATURE_attr from './feature/attr.js';
import FEATURE_dom from './feature/dom.js';
import FEATURE_event from './feature/event.js';

var chiQueryInit = function(selector, context) {
	return new chiQueryComponent(selector, context);
};

var chiQueryComponent = function(selector, context) {
	return CORE_selector(this, selector, context);
};

chiQueryInit.fn = chiQueryComponent.prototype = {
	_changeStack: function(elements, name, args) {
		return INTERNAL_stack().changeStack(this, elements, name, args);
	},
	add: function(selector, context) {
		return FEATURE_nav().add(this, selector, context);
	},
	addClass: function(className) {
		return FEATURE_attr().addClass(this, className);
	},
	attr: function(attrName, attrValue) {
		return FEATURE_attr().attr(this, attrName, attrValue);
	},
	children: function(target) {
		return FEATURE_nav().children(this, target);
	},
	closest: function(target, context) {
		return FEATURE_nav().closest(this, target, context);
	},
	each: function(callback) {
		return FEATURE_misc().each(this, callback);
	},
	end: function() {
		return FEATURE_nav().end(this);
	},
	eq: function(idx) {
		return FEATURE_nav().eq(this, idx);
	},
	filter: function(target) {
		return FEATURE_nav().filter(this, target);
	},
	find: function(selector) {
		return FEATURE_nav().find(this, selector);
	},
	first: function() {
		return FEATURE_nav().first(this);
	},
	get: function(idx) {
		return FEATURE_misc().get(this, idx);
	},
	has: function(selector) {
		return FEATURE_nav().has(this, selector);
	},
	hasClass: function(className) {
		return FEATURE_attr().hasClass(this, className);
	},
	index: function(element) {
		return FEATURE_misc().index(this, element);
	},
	is: function(target) {
		return FEATURE_nav().is(this, target);
	},
	last: function() {
		return FEATURE_nav().last(this);
	},
	map: function(callback) {
		return FEATURE_misc().map(this, callback);
	},
	next: function(target) {
		return FEATURE_nav().next(this, target);
	},
	nextAll: function(target) {
		return FEATURE_nav().nextAll(this, target);
	},
	not: function(target) {
		return FEATURE_nav().not(this, target);
	},
	parent: function(target) {
		return FEATURE_nav().parent(this, target);
	},
	parents: function(target) {
		return FEATURE_nav().parents(this, target);
	},
	prev: function(target) {
		return FEATURE_nav().prev(this, target);
	},
	prevAll: function(target) {
		return FEATURE_nav().prevAll(this, target);
	},
	prop: function(propertyName, propertyValue) {
		return FEATURE_attr().prop(this, propertyName, propertyValue);
	},
	removeAttr: function(attrName) {
		return FEATURE_attr().removeAttr(this, attrName);
	},
	removeClass: function(className) {
		return FEATURE_attr().removeClass(this, className);
	},
	removeProp: function(propertyName) {
		return FEATURE_attr().removeProp(this, propertyName);
	},
	siblings: function(target) {
		return FEATURE_nav().siblings(this, target);
	},
	size: function() {
		return FEATURE_misc().size(this);
	},
	slice: function(start, end) {
		return FEATURE_nav().slice(this, start, end);
	},
	text: function(text) {
		return FEATURE_dom().text(this, text);
	},
	toggleClass: function(className, status) {
		return FEATURE_attr().toggleClass(this, className, status);
	},
	val: function() {
		return FEATURE_attr().val(this);
	}
};

window.$ = window.chiQuery = chiQueryInit;
