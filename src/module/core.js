define([
	"./core/selector",
	"./core/traversing"
], function(core_selector, core_traversing) {

	"use strict";

	var chiQuery = function(selector, context) {
		return new chiQuery.fn.init(selector, context);
	};

	chiQuery.fn = chiQuery.prototype = {
		constructor: chiQuery,
		init: function(selector, context) {
			return chiQuery.selector(selector, context);
		},
		each: function(callback) {
			console.log('aa');
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
		selector: function(selector, context) {
			return core_selector.init(selector, context);
		},
		each: function(obj, callback) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		}
	});

	return chiQuery;
});
