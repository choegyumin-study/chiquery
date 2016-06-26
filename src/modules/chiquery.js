define([
	'./tool/polyfill',
	'./core/traversing',
	'./extend/attributes',
	'./extend/event'
], function(tool_polyfill, core_traversing, extend_attributes, extend_event) {

	"use strict";

	var chiQuery = function(selector, context) {
		return new chiQueryNodes(selector, context);
	};

	var chiQueryNodes = function(selector, context) {
		context = context || document;
		var nodes = context.querySelectorAll(selector);
		for (var i = 0; i < nodes.length; i++) {
			this[i] = nodes[i];
		}
		this.length = nodes.length;
		return this;
	};

	chiQuery.fn = chiQueryNodes.prototype = {
		each: function(callback) {
			return core_traversing.each(this, callback);
		}
	};

	return (window.$ = window.chiQuery = chiQuery);
});
