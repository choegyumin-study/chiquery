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
import FEATURE_style from './feature/style.js';

const chiQueryInit = function chiQueryInit(selector, context) {
	return new chiQueryComponent(selector, context);
};

var chiQueryComponent = function chiQueryComponent(selector, context) {
	return CORE_selector(this, selector, context);
};

chiQueryInit.fn = chiQueryComponent.prototype = {
	_changeStack: function _changeStack(elements, name, args) {
		return INTERNAL_stack().changeStack(this, elements, name, args);
	},
	add: function add(selector, context) {
		return FEATURE_nav().add(this, selector, context);
	},
	addClass: function addClass(className) {
		return FEATURE_attr().addClass(this, className);
	},
	attr: function attr(attrName, attrValue) {
		return FEATURE_attr().attr(this, attrName, attrValue);
	},
	children: function children(target) {
		return FEATURE_nav().children(this, target);
	},
	closest: function closest(target, context) {
		return FEATURE_nav().closest(this, target, context);
	},
	each: function each(callback) {
		return FEATURE_misc().each(this, callback);
	},
	end: function end() {
		return FEATURE_nav().end(this);
	},
	eq: function eq(idx) {
		return FEATURE_nav().eq(this, idx);
	},
	filter: function filter(target) {
		return FEATURE_nav().filter(this, target);
	},
	find: function find(selector) {
		return FEATURE_nav().find(this, selector);
	},
	first: function first() {
		return FEATURE_nav().first(this);
	},
	get: function get(idx) {
		return FEATURE_misc().get(this, idx);
	},
	has: function has(selector) {
		return FEATURE_nav().has(this, selector);
	},
	hasClass: function hasClass(className) {
		return FEATURE_attr().hasClass(this, className);
	},
	index: function index(element) {
		return FEATURE_misc().index(this, element);
	},
	is: function is(target) {
		return FEATURE_nav().is(this, target);
	},
	last: function last() {
		return FEATURE_nav().last(this);
	},
	map: function map(callback) {
		return FEATURE_misc().map(this, callback);
	},
	next: function next(target) {
		return FEATURE_nav().next(this, target);
	},
	nextAll: function nextAll(target) {
		return FEATURE_nav().nextAll(this, target);
	},
	not: function not(target) {
		return FEATURE_nav().not(this, target);
	},
	parent: function parent(target) {
		return FEATURE_nav().parent(this, target);
	},
	parents: function parents(target) {
		return FEATURE_nav().parents(this, target);
	},
	prev: function prev(target) {
		return FEATURE_nav().prev(this, target);
	},
	prevAll: function prevAll(target) {
		return FEATURE_nav().prevAll(this, target);
	},
	prop: function prop(propertyName, propertyValue) {
		return FEATURE_attr().prop(this, propertyName, propertyValue);
	},
	removeAttr: function removeAttr(attrName) {
		return FEATURE_attr().removeAttr(this, attrName);
	},
	removeClass: function removeClass(className) {
		return FEATURE_attr().removeClass(this, className);
	},
	removeProp: function removeProp(propertyName) {
		return FEATURE_attr().removeProp(this, propertyName);
	},
	siblings: function siblings(target) {
		return FEATURE_nav().siblings(this, target);
	},
	size: function size() {
		return FEATURE_misc().size(this);
	},
	slice: function slice(start, end) {
		return FEATURE_nav().slice(this, start, end);
	},
	text: function text(_text) {
		return FEATURE_dom().text(this, _text);
	},
	toggleClass: function toggleClass(className, status) {
		return FEATURE_attr().toggleClass(this, className, status);
	},
	val: function val() {
		return FEATURE_attr().val(this);
	}
};

window.$ = window.chiQuery = chiQueryInit;
