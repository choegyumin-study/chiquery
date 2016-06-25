define(function() {

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

		// DOMTokenList interface and Element.classList / Element.relList
		// Needed for: IE9-
		// Use getClassList(elem) instead of elem.classList() if IE7- support is needed
		// Use getRelList(elem) instead of elem.relList() if IE7- support is needed
		(function() {
			function DOMTokenListShim(o, p) {
				function split(s) {
					return s.length ? s.split(/\s+/g) : [];
				}

				// NOTE: This does not exactly match the spec.
				function removeTokenFromString(token, string) {
					var tokens = split(string),
						index = tokens.indexOf(token);
					if (index !== -1) {
						tokens.splice(index, 1);
					}
					return tokens.join(' ');
				}

				Object.defineProperties(
					this, {
						length: {
							get: function() {
								return split(o[p]).length;
							}
						},

						item: {
							value: function(idx) {
								var tokens = split(o[p]);
								return 0 <= idx && idx < tokens.length ? tokens[idx] : null;
							}
						},

						contains: {
							value: function(token) {
								token = String(token);
								if (token.length === 0) {
									throw SyntaxError();
								}
								if (/\s/.test(token)) {
									throw Error("InvalidCharacterError");
								}
								var tokens = split(o[p]);

								return tokens.indexOf(token) !== -1;
							}
						},

						add: {
							value: function( /*tokens...*/ ) {
								var tokens = Array.prototype.slice.call(arguments).map(String);
								if (tokens.some(function(token) {
										return token.length === 0;
									})) {
									throw SyntaxError();
								}
								if (tokens.some(function(token) {
										return (/\s/).test(token);
									})) {
									throw Error("InvalidCharacterError");
								}

								try {
									var underlying_string = o[p];
									var token_list = split(underlying_string);
									tokens = tokens.filter(function(token) {
										return token_list.indexOf(token) === -1;
									});
									if (tokens.length === 0) {
										return;
									}
									if (underlying_string.length !== 0 && !(/\s$/).test(underlying_string)) {
										underlying_string += ' ';
									}
									underlying_string += tokens.join(' ');
									o[p] = underlying_string;
								} finally {
									var length = split(o[p]).length;
									if (this.length !== length) {
										this.length = length;
									}
								}
							}
						},

						remove: {
							value: function( /*tokens...*/ ) {
								var tokens = Array.prototype.slice.call(arguments).map(String);
								if (tokens.some(function(token) {
										return token.length === 0;
									})) {
									throw SyntaxError();
								}
								if (tokens.some(function(token) {
										return (/\s/).test(token);
									})) {
									throw Error("InvalidCharacterError");
								}

								try {
									var underlying_string = o[p];
									tokens.forEach(function(token) {
										underlying_string = removeTokenFromString(token, underlying_string);
									});
									o[p] = underlying_string;
								} finally {
									var length = split(o[p]).length;
									if (this.length !== length) {
										this.length = length;
									}
								}
							}
						},

						toggle: {
							value: function(token, force) {
								try {
									token = String(token);
									if (token.length === 0) {
										throw SyntaxError();
									}
									if (/\s/.test(token)) {
										throw Error("InvalidCharacterError");
									}
									var tokens = split(o[p]),
										index = tokens.indexOf(token);

									if (index !== -1 && (!force || force === (void 0))) {
										o[p] = removeTokenFromString(token, o[p]);
										return false;
									}
									if (index !== -1 && force) {
										return true;
									}
									var underlying_string = o[p];
									if (underlying_string.length !== 0 && !/\s$/.test(underlying_string)) {
										underlying_string += ' ';
									}
									underlying_string += token;
									o[p] = underlying_string;
									return true;
								} finally {
									var length = split(o[p]).length;
									if (this.length !== length) {
										this.length = length;
									}
								}
							}
						},

						toString: {
							value: function() {
								return o[p];
							}
						}
					});
				if (!('length' in this)) {
					// In case getters are not supported
					this.length = split(o[p]).length;
				} else {
					// If they are, shim in index getters (up to 100)
					for (var i = 0; i < 100; ++i) {
						Object.defineProperty(this, String(i), {
							get: (function(n) {
								return function() {
									return this.item(n);
								};
							}(i))
						});
					}
				}
			}

			function addToElementPrototype(p, f) {
				if ('Element' in global && Element.prototype && Object.defineProperty) {
					Object.defineProperty(Element.prototype, p, {
						get: f
					});
				}
			}

			// HTML - https://html.spec.whatwg.org
			// Element.classList
			if ('classList' in document.createElement('span')) {
				window.getClassList = function(elem) {
					return elem.classList;
				};
			} else {
				window.getClassList = function(elem) {
					return new DOMTokenListShim(elem, 'className');
				};
				addToElementPrototype('classList', function() {
					return new DOMTokenListShim(this, 'className');
				});
			}

			// HTML - https://html.spec.whatwg.org
			// HTMLAnchorElement.relList
			// HTMLLinkElement.relList
			if ('relList' in document.createElement('link')) {
				window.getRelList = function(elem) {
					return elem.relList;
				};
			} else {
				window.getRelList = function(elem) {
					return new DOMTokenListShim(elem, 'rel');
				};
				addToElementPrototype('relList', function() {
					return new DOMTokenListShim(this, 'rel');
				});
			}

			// DOM - Interface NonDocumentTypeChildNode
			// Interface NonDocumentTypeChildNode
			// previousElementSibling / nextElementSibling - for IE8

			if (!('previousElementSibling' in document.documentElement)) {
				addToElementPrototype('previousElementSibling', function() {
					var n = this.previousSibling;
					while (n && n.nodeType !== Node.ELEMENT_NODE)
						n = n.previousSibling;
					return n;
				});
			}

			if (!('nextElementSibling' in document.documentElement)) {
				addToElementPrototype('nextElementSibling', function() {
					var n = this.nextSibling;
					while (n && n.nodeType !== Node.ELEMENT_NODE)
						n = n.nextSibling;
					return n;
				});
			}
		}());

	}(self));

	var module = {};

	return module;
});
