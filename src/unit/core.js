define([
	"./core/DOM",
	"./core/event"
], function(DOM, event) {

	"use strict";

	var chiQuery = function(selector, context) {
		return new chiQuery.fn.init(selector, context);
	};

	chiQuery.fn = chiQuery.prototype = {
		constructor: chiQuery,
		init: function(selector, context) {
			return chiQuery.DOM(selector, context);
		},
		each: function(callback) {
			return chiQuery.each(this, callback);
		}
	};

	chiQuery.extend = chiQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !chiQuery.isFunction(target)) {
			target = {};
		}

		// Extend chiQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (chiQuery.isPlainObject(copy) ||
						(copyIsArray = chiQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && chiQuery.isArray(src) ? src : [];

						} else {
							clone = src && chiQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = chiQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	chiQuery.extend({
		DOM: function(selector, context) {
			return DOM(selector, context);
		},
		each: function() {
			var obj = 'test';
			console.log(obj);
			return obj;
		}
	});

	return chiQuery;
});
