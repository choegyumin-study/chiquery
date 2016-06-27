export function tool_polyfill() {

	"use strict";

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

		// Document.querySelectorAll method
		// http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
		// Needed for: IE7-
		if (!document.querySelectorAll) {
			document.querySelectorAll = function(selectors) {
				var style = document.createElement('style'), elements = [], element;
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

}
