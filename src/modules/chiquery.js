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
	_changeStack(elements, name, args) {
		return INTERNAL_stack().changeStack(this, elements, name, args);
	},
	add(selector, context) {
		return FEATURE_nav().add(this, selector, context);
	},
	addClass(className) {
		return FEATURE_attr().addClass(this, className);
	},
	attr(attrName, attrValue) {
		return FEATURE_attr().attr(this, attrName, attrValue);
	},
	children(target) {
		return FEATURE_nav().children(this, target);
	},
	closest(target, context) {
		return FEATURE_nav().closest(this, target, context);
	},
	each(callback) {
		return FEATURE_misc().each(this, callback);
	},
	end() {
		return FEATURE_nav().end(this);
	},
	eq(idx) {
		return FEATURE_nav().eq(this, idx);
	},
	filter(target) {
		return FEATURE_nav().filter(this, target);
	},
	find(selector) {
		return FEATURE_nav().find(this, selector);
	},
	first() {
		return FEATURE_nav().first(this);
	},
	get(idx) {
		return FEATURE_misc().get(this, idx);
	},
	has(selector) {
		return FEATURE_nav().has(this, selector);
	},
	hasClass(className) {
		return FEATURE_attr().hasClass(this, className);
	},
	index(element) {
		return FEATURE_misc().index(this, element);
	},
	is(target) {
		return FEATURE_nav().is(this, target);
	},
	last() {
		return FEATURE_nav().last(this);
	},
	map(callback) {
		return FEATURE_misc().map(this, callback);
	},
	next(target) {
		return FEATURE_nav().next(this, target);
	},
	nextAll(target) {
		return FEATURE_nav().nextAll(this, target);
	},
	not(target) {
		return FEATURE_nav().not(this, target);
	},
	parent(target) {
		return FEATURE_nav().parent(this, target);
	},
	parents(target) {
		return FEATURE_nav().parents(this, target);
	},
	prev(target) {
		return FEATURE_nav().prev(this, target);
	},
	prevAll(target) {
		return FEATURE_nav().prevAll(this, target);
	},
	prop(propertyName, propertyValue) {
		return FEATURE_attr().prop(this, propertyName, propertyValue);
	},
	removeAttr(attrName) {
		return FEATURE_attr().removeAttr(this, attrName);
	},
	removeClass(className) {
		return FEATURE_attr().removeClass(this, className);
	},
	removeProp(propertyName) {
		return FEATURE_attr().removeProp(this, propertyName);
	},
	siblings(target) {
		return FEATURE_nav().siblings(this, target);
	},
	size() {
		return FEATURE_misc().size(this);
	},
	slice(start, end) {
		return FEATURE_nav().slice(this, start, end);
	},
	text(_text) {
		return FEATURE_dom().text(this, _text);
	},
	toggleClass(className, status) {
		return FEATURE_attr().toggleClass(this, className, status);
	},
	val() {
		return FEATURE_attr().val(this);
	}
};

window.$ = window.chiQuery = chiQueryInit;
