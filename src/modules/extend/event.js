define(function() {

	(function(global) {
		if (!('window' in global && 'document' in global))
			return;

		// Event and EventTargets interfaces
		// Needed for: IE8
		(function() {
			if (!('Element' in global) || Element.prototype.addEventListener || !Object.defineProperty)
				return;

			// interface Event

			// PhaseType (const unsigned short)
			Event.CAPTURING_PHASE = 1;
			Event.AT_TARGET = 2;
			Event.BUBBLING_PHASE = 3;

			Object.defineProperties(Event.prototype, {
				CAPTURING_PHASE: {
					get: function() {
						return 1;
					}
				},
				AT_TARGET: {
					get: function() {
						return 2;
					}
				},
				BUBBLING_PHASE: {
					get: function() {
						return 3;
					}
				},
				target: {
					get: function() {
						return this.srcElement;
					}
				},
				currentTarget: {
					get: function() {
						return this._currentTarget;
					}
				},
				eventPhase: {
					get: function() {
						return (this.srcElement === this.currentTarget) ? Event.AT_TARGET : Event.BUBBLING_PHASE;
					}
				},
				bubbles: {
					get: function() {
						switch (this.type) {
							// Mouse
							case 'click':
							case 'dblclick':
							case 'mousedown':
							case 'mouseup':
							case 'mouseover':
							case 'mousemove':
							case 'mouseout':
							case 'mousewheel':
							// Keyboard
							case 'keydown':
							case 'keypress':
							case 'keyup':
							// Frame/Object
							case 'resize':
							case 'scroll':
							// Form
							case 'select':
							case 'change':
							case 'submit':
							case 'reset':
								return true;
						}
						return false;
					}
				},
				cancelable: {
					get: function() {
						switch (this.type) {
							// Mouse
							case 'click':
							case 'dblclick':
							case 'mousedown':
							case 'mouseup':
							case 'mouseover':
							case 'mouseout':
							case 'mousewheel':
							// Keyboard
							case 'keydown':
							case 'keypress':
							case 'keyup':
							// Form
							case 'submit':
								return true;
						}
						return false;
					}
				},
				timeStamp: {
					get: function() {
						return this._timeStamp;
					}
				},
				stopPropagation: {
					value: function() {
						this.cancelBubble = true;
					}
				},
				preventDefault: {
					value: function() {
						this.returnValue = false;
					}
				},
				defaultPrevented: {
					get: function() {
						return this.returnValue === false;
					}
				}
			});

			// interface EventTarget

			function addEventListener(type, listener, useCapture) {
				if (typeof listener !== 'function') return;
				if (type === 'DOMContentLoaded') type = 'load';
				var target = this;
				var f = function(e) {
					e._timeStamp = Date.now();
					e._currentTarget = target;
					listener.call(this, e);
					e._currentTarget = null;
				};
				this['_' + type + listener] = f;
				this.attachEvent('on' + type, f);
			}

			function removeEventListener(type, listener, useCapture) {
				if (typeof listener !== 'function') return;
				if (type === 'DOMContentLoaded') type = 'load';
				var f = this['_' + type + listener];
				if (f) {
					this.detachEvent('on' + type, f);
					this['_' + type + listener] = null;
				}
			}

			[Window, HTMLDocument, Element].forEach(function(o) {
				o.prototype.addEventListener = addEventListener;
				o.prototype.removeEventListener = removeEventListener;
			});
		}());

		// Shim for DOM Events for IE7-
		// http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
		// Use addEvent(object, event, handler) instead of object.addEventListener(event, handler)
		window.addEvent = function(obj, type, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(type, fn, false);
			} else if (obj.attachEvent) {
				obj["e" + type + fn] = fn;
				obj[type + fn] = function() {
					var e = window.event;
					e.currentTarget = obj;
					e.preventDefault = function() {
						e.returnValue = false;
					};
					e.stopPropagation = function() {
						e.cancelBubble = true;
					};
					e.target = e.srcElement;
					e.timeStamp = Date.now();
					obj["e" + type + fn].call(this, e);
				};
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		};

		window.removeEvent = function(obj, type, fn) {
			if (obj.removeEventListener) {
				obj.removeEventListener(type, fn, false);
			} else if (obj.detachEvent) {
				obj.detachEvent("on" + type, obj[type + fn]);
				obj[type + fn] = null;
				obj["e" + type + fn] = null;
			}
		};
	}(self));

	var modules = {};

	return modules;
});
