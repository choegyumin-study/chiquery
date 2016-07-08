(function() {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  (function(global) {
    if (!('window' in global && 'document' in global)) return;

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

    if (!document.querySelector) {
      document.querySelector = function(selectors) {
        var elements = document.querySelectorAll(selectors);
        return elements.length ? elements[0] : null;
      };
    }

    if ('Element' in global && !Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
    }

    if (!Object.keys) {
      Object.keys = function() {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{
            toString: null
          }.propertyIsEnumerable('toString'),
          dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
          dontEnumsLength = dontEnums.length;
        return function(obj) {
          if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }
          var result = [],
            prop,
            i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }();
    }

    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
          return -1;
        }
        var n = +fromIndex || 0;
        if (Math.abs(n) === Infinity) {
          n = 0;
        }
        if (n >= len) {
          return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
          if (k in o && o[k] === searchElement) {
            return k;
          }
          k++;
        }
        return -1;
      };
    }
  })(self);

  function TOOL_fn() {

    var modules = {};

    modules.getChildNodesArray = function(obj, target, loop) {
      target = target ? modules.nodesSelector(target) : undefined;
      var nodes = [];
      for (var _i = 0; _i < obj.length; _i++) {
        var childNodes = obj[_i].childNodes;
        var _j = 0;
        while (childNodes !== null && (!loop || loop > _j)) {
          for (var _k = 0; _k < childNodes.length; _k++) {
            var childNode = childNodes[_k];
            if ((!target || target.indexOf(childNode) > -1) && modules.isElementNodeItem(childNode)) {
              nodes.push(childNode);
            }
          }
          childNodes = childNodes.parentNode;
          _j++;
        }
      }
      return nodes;
    };

    modules.getParentNodesArray = function(obj, target, loop) {
      target = target ? modules.nodesSelector(target) : undefined;
      var nodes = [];
      for (var _i = 0; _i < obj.length; _i++) {
        var parentNode = obj[_i].parentNode;
        var _j = 0;
        while (parentNode !== null && parentNode !== document && (!loop || loop > _j)) {
          if (!target || target.indexOf(parentNode) > -1) {
            var hasParentIdx = nodes.indexOf(parentNode);
            if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
            nodes.push(parentNode);
          }
          parentNode = parentNode.parentNode;
          _j++;
        }
      }
      return nodes;
    };

    modules.getSiblingNodesArray = function(obj, turn, target, loop) {
      function getNodesOfTurn(obj, turn, target, loop) {
        turn = turn === 'prev' ? 'previous' : turn;
        var nodes = [];
        for (var _i = 0; _i < obj.length; _i++) {
          var siblingNode = obj[_i][turn + 'Sibling'];
          var _j = 0;
          while (siblingNode !== null && siblingNode !== document && (!loop || loop > _j)) {
            if (modules.isElementNodeItem(siblingNode)) {
              if (!target || target.indexOf(siblingNode) > -1) {
                nodes.push(siblingNode);
              }
              _j++;
            }
            siblingNode = siblingNode[turn + 'Sibling'];
          }
        }
        return nodes;
      }
      turn = turn || 'all';
      target = target ? modules.nodesSelector(target) : undefined;
      var nodes = [];
      if (turn === 'all' || turn === 'prev') nodes = nodes.concat(getNodesOfTurn(obj, 'prev', target, loop));
      if (turn === 'all' || turn === 'next') nodes = nodes.concat(getNodesOfTurn(obj, 'next', target, loop));
      return nodes;
    };

    modules.hasAttr = function(obj, attrName, attrValue) {
      if (modules.isObject(obj)) {
        return modules.regexDetectString(obj, obj.getAttribute(attrName), attrValue);
      }
      return false;
    };

    modules.isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    modules.isBoolean = function(obj) {
      return typeof obj === 'boolean';
    };

    modules.ischiQueryComponent = function(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.isChiQuery;
    };

    modules.isElementNodeItem = function(obj) {
      return modules.isNodeItem(obj) && obj.nodeType === 1;
    };

    modules.isFunction = function(obj) {
      return typeof obj === 'function';
    };

    modules.isNodeItem = function(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeName === 'string' && typeof obj.nodeType === 'number';
    };

    modules.isNull = function(obj) {
      return obj === null;
    };

    modules.isNumber = function(obj) {
      return typeof obj === 'number';
    };

    modules.isNodeList = function(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(obj)) && typeof obj.length === 'number' && (obj.length === 0 || _typeof(obj[0]) === 'object' && obj[0].nodeType > 0);
    };

    modules.isObject = function(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
    };

    modules.isObjectWithoutArray = function(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.prototype.toString.call(obj) !== '[object Array]';
    };

    modules.isString = function(obj) {
      return typeof obj === 'string';
    };

    modules.isUndefined = function(obj) {
      return typeof obj === 'undefined';
    };

    modules.negativeNumberWithinLength = function(idx, len) {
      if (idx < 0) idx = len + idx;
      return idx;
    };

    modules.nodesSelector = function(selector, args) {
      function detectNodeInContext(elements, context) {
        var nodes;
        if (context && context[0] !== document) {
          nodes = [];
          for (var _i = 0; _i < elements.length; _i++) {
            var currentNode = elements[_i],
              parentNode = elements[_i].parentNode;
            while (parentNode !== null && parentNode !== document) {
              if (context.indexOf(parentNode) > -1) {
                nodes.push(currentNode);
                break;
              }
              parentNode = parentNode.parentNode;
            }
          }
        } else {
          nodes = elements;
        }
        return nodes;
      }

      function selectorToNodes(selector, context) {
        var elsType = 'typeError',
          elsList = [];
        if (context === undefined) context = [document];
        if (modules.isArray(context) && context.length > 0) {
          if (modules.ischiQueryComponent(selector)) {
            elsType = 'chiQueryComponent';
            elsList = detectNodeInContext(modules.nodesToArray(selector), context);
          } else if (modules.isNodeItem(selector)) {
            elsType = 'nodeItem';
            elsList = detectNodeInContext([selector], context);
          } else if (modules.isNodeList(selector)) {
            elsType = 'nodeList';
            elsList = detectNodeInContext(modules.nodesToArray(selector), context);
          } else if (modules.isArray(selector)) {
            elsType = 'array';
            elsList = detectNodeInContext(selector, context);
          } else if (modules.isString(selector)) {
            if (args.createDOM && selector[0] === "<") {
              elsType = 'htmlString';
              var createDOM = document.createElement('body');
              createDOM.innerHTML = selector;
              elsList = modules.nodesToArray(createDOM.childNodes);
            } else {
              elsType = 'string';
              for (var _i = 0; _i < context.length; _i++) {
                elsList = elsList.concat(modules.nodesToArray(context[_i].querySelectorAll(selector)));
              }
            }
          }
        }
        return {
          list: elsList,
          type: elsType
        };
      }
      args = args || {};
      args.context = args.context ? selectorToNodes(args.context).list : [document];
      args.createDOM = args.createDOM || false;
      var nodes = selectorToNodes(selector, args.context);
      if (args.callback) args.callback.call(nodes.list, nodes.type);
      return nodes.list;
    };

    modules.nodesToArray = function(nodes) {
      var nodesArr = [];
      for (var _i = 0; _i < nodes.length; _i++) {
        nodesArr.push(nodes[_i]);
      }
      return nodesArr;
    };

    modules.regexDetectString = function(obj, value, regexValue) {
      return new RegExp("(\\s|^)" + regexValue + "(\\s|$)").test(value);
    };

    return modules;
  }

  function CORE_selector(_this, selector, context) {

    context = context ? TOOL_fn().nodesSelector(context) : [document];
    var nodes = TOOL_fn().nodesSelector(selector, {
      context: context,
      createDOM: true,
      callback: function callback(selectorType) {
        if (selectorType === 'string') _this.selector = selector;
      }
    });

    for (var _i = 0; _i < nodes.length; _i++) {
      _this[_i] = nodes[_i];
    }

    _this.isChiQuery = true;
    _this.length = nodes.length;

    return _this;
  }

  function INTERNAL_stack() {

    var modules = {};

    modules.changeStack = function(_this, elements, context) {
      var ret = chiQuery(elements, context);
      ret.history = _this;
      return ret;
    };

    return modules;
  }

  function FEATURE_misc() {

    var modules = {};

    modules.each = function(_this, callback) {
      var len = _this.length;
      for (var _i = 0; _i < len; _i++) {
        var node = _this.get(_i);
        if (callback.call(node, _i, node) === false) {
          break;
        }
      }
      return _this;
    };

    modules.get = function(_this, idx) {
      var len = _this.length,
        node;
      if (TOOL_fn().isNumber(idx)) {
        idx = TOOL_fn().negativeNumberWithinLength(idx, len);
        node = _this[idx];
      } else {
        node = TOOL_fn().nodesToArray(_this);
      }
      return node;
    };

    modules.index = function(_this, element) {
      var returnIdx = -1,
        elements,
        target;
      if (element) {
        elements = _this;
        target = chiQuery(element);
      } else {
        var nodes = [],
          nodeList = _this.parent().children();
        for (var _i = 0; _i < nodeList.length; _i++) {
          nodes.push(nodeList[_i]);
        }
        elements = chiQuery(nodes);
        target = _this;
      }
      elements.each(function(idx) {
        if (this === target.get(0)) {
          returnIdx = idx;
          return false;
        }
      });
      return returnIdx;
    };

    modules.map = function(_this, callback) {
      var arr = [];
      _this.each(function(idx) {
        var node = this,
          returned = callback.call(node, idx, node);
        if (!TOOL_fn().isNull(returned) && !TOOL_fn().isUndefined(returned)) arr.push(returned);
      });
      return arr;
    };

    modules.size = function(_this) {
      return _this.length;
    };

    return modules;
  }

  function FEATURE_nav() {

    var modules = {};

    modules.add = function(_this, selector, context) {
      context = context || document;
      var nodes = TOOL_fn().nodesToArray(_this).concat(TOOL_fn().nodesSelector(selector, {
        context: context,
        createDOM: true
      }));
      return _this._changeStack(nodes);
    };

    modules.children = function(_this, target) {
      var nodes = TOOL_fn().getChildNodesArray(_this, target, 1);
      return _this._changeStack(nodes);
    };

    modules.closest = function(_this, target, context) {
      target = TOOL_fn().nodesSelector(target);
      var nodes = [];
      _this.each(function() {
        var parentNode = this;
        while (parentNode !== null && parentNode !== document && TOOL_fn().nodesSelector(context).indexOf(parentNode) < 0) {
          if (target.indexOf(parentNode) > -1) {
            var hasParentIdx = nodes.indexOf(parentNode);
            if (hasParentIdx > -1) nodes.splice(hasParentIdx, 1);
            nodes.push(parentNode);
            break;
          }
          parentNode = parentNode.parentNode;
        }
      });
      return _this._changeStack(nodes);
    };

    modules.end = function(_this) {
      return _this.history;
    };

    modules.eq = function(_this, idx) {
      var len = _this.length;
      idx = TOOL_fn().negativeNumberWithinLength(idx, len);
      return _this._changeStack(_this.get(idx));
    };

    modules.filter = function(_this, target) {
      var nodes = [];
      if (TOOL_fn().isFunction(target)) {
        _this.each(function(idx) {
          var node = this;
          if (target.call(node, idx, node)) {
            nodes.push(node);
          }
        });
      } else {
        target = TOOL_fn().nodesSelector(target);
        _this.each(function() {
          var node = this;
          if (!target || target.indexOf(node) > -1) nodes.push(node);
        });
      }
      return _this._changeStack(nodes);
    };

    modules.find = function(_this, selector) {
      return _this._changeStack(selector, _this);
    };

    modules.first = function(_this) {
      return _this._changeStack(_this.get(0));
    };

    modules.has = function(_this, selector) {
      var nodes = [];
      _this.each(function() {
        var node = this;
        if (chiQuery(selector, node).size() > 0) nodes.push(node);
      });
      return _this._changeStack(nodes);
    };

    modules.is = function(_this, target) {
      var returnBool = false;
      if (TOOL_fn().isFunction(target)) {
        _this.each(function(idx) {
          var node = this;
          if (target.call(node, idx, node)) {
            returnBool = true;
            return false;
          }
        });
        return returnBool;
      } else {
        target = TOOL_fn().nodesSelector(target);
        if (TOOL_fn().isArray(target)) {
          _this.each(function() {
            var node = this;
            if (target.indexOf(node) > -1) {
              returnBool = true;
              return false;
            }
          });
          return returnBool;
        } else {
          return returnBool;
        }
      }
    };

    modules.last = function(_this) {
      return _this._changeStack(_this.get(-1));
    };

    modules.next = function(_this, target) {
      var nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target, 1);
      return _this._changeStack(nodes);
    };

    modules.nextAll = function(_this, target) {
      var nodes = TOOL_fn().getSiblingNodesArray(_this, 'next', target);
      return _this._changeStack(nodes);
    };

    modules.not = function(_this, target) {
      var nodes = [];
      if (TOOL_fn().isFunction(target)) {
        _this.each(function(idx) {
          var node = this;
          if (!target.call(node, idx, node)) {
            nodes.push(node);
          }
        });
      } else {
        target = TOOL_fn().nodesSelector(target);
        _this.each(function() {
          var node = this;
          if (!target || target.indexOf(node) < 0) nodes.push(node);
        });
      }
      return _this._changeStack(nodes);
    };

    modules.parent = function(_this, target) {
      var nodes = TOOL_fn().getParentNodesArray(_this, target, 1);
      return _this._changeStack(nodes);
    };

    modules.parents = function(_this, target) {
      var nodes = TOOL_fn().getParentNodesArray(_this, target);
      return _this._changeStack(nodes);
    };

    modules.prev = function(_this, target) {
      var nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target, 1);
      return _this._changeStack(nodes);
    };

    modules.prevAll = function(_this, target) {
      var nodes = TOOL_fn().getSiblingNodesArray(_this, 'prev', target);
      return _this._changeStack(nodes);
    };

    modules.siblings = function(_this, target) {
      var nodes = TOOL_fn().getSiblingNodesArray(_this, 'all', target);
      return _this._changeStack(nodes);
    };

    modules.slice = function(_this, start, end) {
      var nodes = [],
        len = _this.size();
      start = TOOL_fn().negativeNumberWithinLength(start, len);
      end = TOOL_fn().negativeNumberWithinLength(end, len);
      _this.filter(function(idx) {
        if (idx >= start && (!end || idx < end)) nodes.push(this);
      });
      return _this._changeStack(nodes);
    };

    return modules;
  }

  function FEATURE_attr() {

    var modules = {};

    modules.addClass = function(_this, className) {
      var element,
        len = _this.size();
      if (TOOL_fn().isString(className)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          if (TOOL_fn().hasAttr(element, "class", className) === false) chiQuery(element).attr("class", chiQuery(element).attr("class") + " " + className);
        }
      } else if (TOOL_fn().isFunction(className)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          if (TOOL_fn().hasAttr(element, "class", className) === false) chiQuery(element).addClass(className.call(element, _i, chiQuery(element).attr("class")));
        }
      }
      return _this;
    };

    modules.attr = function(_this, attrName, attrValue) {
      var element,
        len = _this.size();
      if (TOOL_fn().isUndefined(attrValue)) {
        if (len < 1) return _this;
        return _this.get(0).getAttribute(attrName);
      } else if (TOOL_fn().isString(attrValue)) {
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          element.setAttribute(attrName, attrValue);
        }
        return _this;
      } else if (TOOL_fn().isFunction(attrValue)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          chiQuery(element).attr(attrName, attrValue.call(element, _i, element.getAttribute(attrName)));
        }
        return _this;
      }
      return undefined;
    };

    modules.hasClass = function(_this, className) {
      var element,
        len = _this.size();
      for (var _i = 0; _i < len; _i++) {
        element = _this.get(_i);
        if (TOOL_fn().hasAttr(element, "class", className) === true) {
          return true;
        }
      }
      return false;
    };

    modules.prop = function(_this, propertyName, propertyValue) {
      var element,
        len = _this.size();
      if (TOOL_fn().isObject(propertyName)) {
        if (len < 1) return undefined;
        for (var _i = 0; _i < len; _i++) {
          var propertyObj = Object.keys(propertyName);
          if (propertyObj.length < 1) return _this;
          element = _this.get(_i);
          for (var _j = 0; _j < propertyObj.length; _j++) {
            element[propertyObj[_j]] = propertyName[propertyObj[_j]];
          }
        }
      } else if (TOOL_fn().isUndefined(propertyValue)) {
        return _this.get(0)[propertyName];
      } else if (TOOL_fn().isFunction(propertyValue) === false) {
        if (len < 1) return undefined;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          element[propertyName] = propertyValue;
        }
        return _this;
      } else if (TOOL_fn().isFunction(propertyValue)) {
        if (len < 1) return undefined;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          chiQuery(element).prop(propertyName, propertyValue.call(element, _i, chiQuery(element).prop(propertyName)));
        }
        return _this;
      }
      return undefined;
    };

    modules.removeAttr = function(_this, attrName) {
      var element,
        len = _this.size();
      for (var _i = 0; _i < len; _i++) {
        element = _this.get(_i);
        element.removeAttribute(attrName);
      }
      return _this;
    };

    modules.removeClass = function(_this, className) {
      var element,
        len = _this.size();
      if (TOOL_fn().isString(className)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          var regex = new RegExp("(\\s|^)" + className + "(\\s|$)");
          chiQuery(element).attr("class", chiQuery(element).attr("class").replace(regex, " ").trim());
        }
      } else if (TOOL_fn().isFunction(className)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          chiQuery(element).removeClass(className.call(element, _i, chiQuery(element).attr("class")));
        }
      }
      return _this;
    };

    modules.removeProp = function(_this, propertyName) {
      var element,
        len = _this.size();
      if (len < 1) return undefined;
      for (var _i = 0; _i < len; _i++) {
        element = _this.get(_i);
        element[propertyName] = undefined;
        delete element[propertyName];
      }
      return _this;
    };

    modules.toggleClass = function(_this, className, status) {
      var element,
        len = _this.size();
      if (TOOL_fn().isString(className)) {
        if (len < 1) return _this;
        if (TOOL_fn().isBoolean(status)) {
          if (status === true) {
            chiQuery(element).addClass(className);
          } else {
            chiQuery(element).removeClass(className);
          }
          return _this;
        }
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          if (TOOL_fn().hasAttr(element, "class", className)) {
            chiQuery(element).removeClass(className);
          } else {
            chiQuery(element).addClass(className);
          }
        }
      } else if (TOOL_fn().isFunction(className)) {
        if (len < 1) return _this;
        for (var _i = 0; _i < len; _i++) {
          element = _this.get(_i);
          chiQuery(element).toggleClass(className.call(element, _i, chiQuery(element).attr("class")));
        }
      }
      return _this;
    };

    modules.val = function(_this) {
      var element = _this.get(0);
      if (TOOL_fn().isUndefined(element.value)) {
        return "";
      } else {
        return element.value;
      }
    };

    return modules;
  }

  function FEATURE_dom() {

    var modules = {};

    modules.text = function(_this, text) {
      _this.get(0).innerText = text;
      return _this;
    };

    return modules;
  }

  var chiQueryInit = function chiQueryInit(selector, context) {
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

}());
