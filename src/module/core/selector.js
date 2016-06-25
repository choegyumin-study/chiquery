define(function() {

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

		// Document.querySelectorAll method
		// http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
		// Needed for: IE7-
		if (!document.querySelectorAll) {
			document.querySelectorAll = function(selectors) {
				var style = document.createElement('style'),
					elements = [],
					element;
				document.documentElement.firstChild.appendChild(style);
				document._qsa = [];

				style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
				window.scrollBy(0, 0);
				style.parentNode.removeChild(style);

				while (document._qsa.length) {
					element = document._qsa.shift();
					element.style.removeAttribute('x-qsa');
					elements.push(element);
				}
				document._qsa = null;
				return elements;
			};
		}

		// Document.querySelector method
		// Needed for: IE7-
		if (!document.querySelector) {
			document.querySelector = function(selectors) {
				var elements = document.querySelectorAll(selectors);
				return (elements.length) ? elements[0] : null;
			};
		}

		// Document.getElementsByClassName method
		// Needed for: IE8-
		// if (!document.getElementsByClassName) {
		// 	document.getElementsByClassName = function(classNames) {
		// 		classNames = String(classNames).replace(/^|\s+/g, '.');
		// 		return document.querySelectorAll(classNames);
		// 	};
		// }

		// Node interface constants
		// Needed for: IE8-
		global.Node = global.Node || function() {
				throw TypeError("Illegal constructor");
			};
		Node.ELEMENT_NODE = 1;
		Node.ATTRIBUTE_NODE = 2;
		Node.TEXT_NODE = 3;
		Node.CDATA_SECTION_NODE = 4;
		Node.ENTITY_REFERENCE_NODE = 5;
		Node.ENTITY_NODE = 6;
		Node.PROCESSING_INSTRUCTION_NODE = 7;
		Node.COMMENT_NODE = 8;
		Node.DOCUMENT_NODE = 9;
		Node.DOCUMENT_TYPE_NODE = 10;
		Node.DOCUMENT_FRAGMENT_NODE = 11;
		Node.NOTATION_NODE = 12;

		// DOMException constants
		// Needed for: IE8-
		global.DOMException = global.DOMException || function() {
				throw TypeError("Illegal constructor");
			};
		DOMException.INDEX_SIZE_ERR = 1;
		DOMException.DOMSTRING_SIZE_ERR = 2;
		DOMException.HIERARCHY_REQUEST_ERR = 3;
		DOMException.WRONG_DOCUMENT_ERR = 4;
		DOMException.INVALID_CHARACTER_ERR = 5;
		DOMException.NO_DATA_ALLOWED_ERR = 6;
		DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
		DOMException.NOT_FOUND_ERR = 8;
		DOMException.NOT_SUPPORTED_ERR = 9;
		DOMException.INUSE_ATTRIBUTE_ERR = 10;
		DOMException.INVALID_STATE_ERR = 11;
		DOMException.SYNTAX_ERR = 12;
		DOMException.INVALID_MODIFICATION_ERR = 13;
		DOMException.NAMESPACE_ERR = 14;
		DOMException.INVALID_ACCESS_ERR = 15;

		// Element.matches
		// https://developer.mozilla.org/en/docs/Web/API/Element/matches
		// Needed for: IE, Firefox 3.6, early Webkit and Opera 15.0
		// Use msMatchesSelector(selector) for IE
		// Use oMatchesSelector(selector) for Opera 15.0
		// Use mozMatchesSelector(selector) for Firefox 3.6
		// Use webkitMatchesSelector(selector) for early Webkit
		// Use polyfill if no matches() support, but querySelectorAll() support
		if ('Element' in global && !Element.prototype.matches) {
			if (Element.prototype.msMatchesSelector) {
				Element.prototype.matches = Element.prototype.msMatchesSelector;
			} else if (Element.prototype.oMatchesSelector) {
				Element.prototype.matches = Element.prototype.oMatchesSelector;
			} else if (Element.prototype.mozMatchesSelector) {
				Element.prototype.matches = Element.prototype.mozMatchesSelector;
			} else if (Element.prototype.webkitMatchesSelector) {
				Element.prototype.matches = Element.prototype.webkitMatchesSelector;
			} else if (document.querySelectorAll) {
				Element.prototype.matches = function matches(selector) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(selector),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
			}
		}

	}(self));

	var module = {};

	module.init = function(selector, context) {
		context = context || document;
		return context.querySelectorAll(selector);
	}
	return module;
});
