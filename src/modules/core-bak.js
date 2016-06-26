define([
	"./polyfill/selector",
	"./core/traversing"
], function(core_selector, core_traversing) {

	"use strict";

	var chiQuery = function(selector, context) {
		return new chiQueryInit(selector, context);
	};

	var chiQueryInit = function(selector, context) {
		// Lets make a really simplistic selector implementation for demo purposes
		context = context || document;
		var nodes = context.querySelectorAll(selector);
		for (var i = 0; i < nodes.length; i++) {
			this[i] = nodes[i];
		}
		this.length = nodes.length;
		return this;
	};

	// Expose the prototype object via chiQuery.fn so methods can be added later
	chiQuery.fn = chiQueryInit.prototype = {
		// API Methods
		each: function(elements, callback) {
			console.log('each');
			return this;
		},
		hide: function() {
			for (var i = 0; i < this.length; i++) {
				this[i].style.display = 'none';
			}
			return this;
		},
		remove: function() {
			for (var i = 0; i < this.length; i++) {
				this[i].parentNode.removeChild(this[i]);
			}
			return this;
		}
		// More methods here, each using 'return this', to enable chaining
	};

	return chiQuery;
});
