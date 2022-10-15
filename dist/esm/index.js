/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t = function (n, e) {
  return (
    (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, n) {
          t.__proto__ = n;
        }) ||
      function (t, n) {
        for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
      }),
    t(n, e)
  );
};
var n = function () {
  return (
    (n =
      Object.assign ||
      function (t) {
        for (var n, e = 1, i = arguments.length; e < i; e++)
          for (var r in (n = arguments[e]))
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        return t;
      }),
    n.apply(this, arguments)
  );
};
'undefined' != typeof globalThis
  ? globalThis
  : 'undefined' != typeof window
  ? window
  : 'undefined' != typeof global
  ? global
  : 'undefined' != typeof self && self;
function e(t) {
  var n = t.default;
  if ('function' == typeof n) {
    var e = function () {
      return n.apply(this, arguments);
    };
    e.prototype = n.prototype;
  } else e = {};
  return (
    Object.defineProperty(e, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (n) {
      var i = Object.getOwnPropertyDescriptor(t, n);
      Object.defineProperty(
        e,
        n,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return t[n];
              },
            }
      );
    }),
    e
  );
}
var i = (function () {
  function t(t, n) {
    for (var e = 0; e < n.length; e++) {
      var i = n[e];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        'value' in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  return function (n, e, i) {
    return e && t(n.prototype, e), i && t(n, i), n;
  };
})();
function r(t, n) {
  if (!(t instanceof n))
    throw new TypeError('Cannot call a class as a function');
}
var o = { emitDelay: 10, strictMode: !1 },
  a = (function () {
    function t() {
      var n =
        arguments.length <= 0 || void 0 === arguments[0] ? o : arguments[0];
      r(this, t);
      var e = void 0,
        i = void 0;
      (e = n.hasOwnProperty('emitDelay') ? n.emitDelay : o.emitDelay),
        (this._emitDelay = e),
        (i = n.hasOwnProperty('strictMode') ? n.strictMode : o.strictMode),
        (this._strictMode = i),
        (this._listeners = {}),
        (this.events = []);
    }
    return (
      i(t, [
        {
          key: '_addListenner',
          value: function (t, n, e) {
            if ('function' != typeof n)
              throw TypeError('listener must be a function');
            -1 === this.events.indexOf(t)
              ? ((this._listeners[t] = [{ once: e, fn: n }]),
                this.events.push(t))
              : this._listeners[t].push({ once: e, fn: n });
          },
        },
        {
          key: 'on',
          value: function (t, n) {
            this._addListenner(t, n, !1);
          },
        },
        {
          key: 'once',
          value: function (t, n) {
            this._addListenner(t, n, !0);
          },
        },
        {
          key: 'off',
          value: function (t, n) {
            var e,
              i,
              r = this,
              o = this.events.indexOf(t);
            t &&
              -1 !== o &&
              (n
                ? ((e = []),
                  (i = r._listeners[t]).forEach(function (t, i) {
                    t.fn === n && e.unshift(i);
                  }),
                  e.forEach(function (t) {
                    i.splice(t, 1);
                  }),
                  i.length || (r.events.splice(o, 1), delete r._listeners[t]))
                : (delete this._listeners[t], this.events.splice(o, 1)));
          },
        },
        {
          key: '_applyEvents',
          value: function (t, n) {
            var e = this._listeners[t];
            if (e && e.length) {
              var i = [];
              e.forEach(function (t, e) {
                t.fn.apply(null, n), t.once && i.unshift(e);
              }),
                i.forEach(function (t) {
                  e.splice(t, 1);
                });
            } else if (this._strictMode)
              throw 'No listeners specified for event: ' + t;
          },
        },
        {
          key: 'emit',
          value: function (t) {
            for (
              var n = this,
                e = arguments.length,
                i = Array(e > 1 ? e - 1 : 0),
                r = 1;
              r < e;
              r++
            )
              i[r - 1] = arguments[r];
            this._emitDelay
              ? setTimeout(function () {
                  n._applyEvents.call(n, t, i);
                }, this._emitDelay)
              : this._applyEvents(t, i);
          },
        },
        {
          key: 'emitSync',
          value: function (t) {
            for (
              var n = arguments.length, e = Array(n > 1 ? n - 1 : 0), i = 1;
              i < n;
              i++
            )
              e[i - 1] = arguments[i];
            this._applyEvents(t, e);
          },
        },
        {
          key: 'destroy',
          value: function () {
            (this._listeners = {}), (this.events = []);
          },
        },
      ]),
      t
    );
  })(),
  u = 'http://www.w3.org/1999/xhtml',
  s = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: u,
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
  };
function c(t) {
  var n = (t += ''),
    e = n.indexOf(':');
  return (
    e >= 0 && 'xmlns' !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
    s.hasOwnProperty(n) ? { space: s[n], local: t } : t
  );
}
function h(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === u && n.documentElement.namespaceURI === u
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function l(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function f(t) {
  var n = c(t);
  return (n.local ? l : h)(n);
}
function _() {}
function p(t) {
  return null == t
    ? _
    : function () {
        return this.querySelector(t);
      };
}
function y() {
  return [];
}
function g(t) {
  return new Array(t.length);
}
function d(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
d.prototype = {
  constructor: d,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function m(t, n, e, i, r, o) {
  for (var a, u = 0, s = n.length, c = o.length; u < c; ++u)
    (a = n[u]) ? ((a.__data__ = o[u]), (i[u] = a)) : (e[u] = new d(t, o[u]));
  for (; u < s; ++u) (a = n[u]) && (r[u] = a);
}
function v(t, n, e, i, r, o, a) {
  var u,
    s,
    c,
    h = {},
    l = n.length,
    f = o.length,
    _ = new Array(l);
  for (u = 0; u < l; ++u)
    (s = n[u]) &&
      ((_[u] = c = '$' + a.call(s, s.__data__, u, n)),
      c in h ? (r[u] = s) : (h[c] = s));
  for (u = 0; u < f; ++u)
    (s = h[(c = '$' + a.call(t, o[u], u, o))])
      ? ((i[u] = s), (s.__data__ = o[u]), (h[c] = null))
      : (e[u] = new d(t, o[u]));
  for (u = 0; u < l; ++u) (s = n[u]) && h[_[u]] === s && (r[u] = s);
}
function x(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function w(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function M(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function b(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function T(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function k(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function S(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function N(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function C(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function D(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function A(t, n, e) {
  return function () {
    var i = n.apply(this, arguments);
    null == i ? this.style.removeProperty(t) : this.style.setProperty(t, i, e);
  };
}
function U(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    N(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function E(t) {
  return function () {
    delete this[t];
  };
}
function P(t, n) {
  return function () {
    this[t] = n;
  };
}
function F(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e ? delete this[t] : (this[t] = e);
  };
}
function Y(t) {
  return t.trim().split(/^|\s+/);
}
function H(t) {
  return t.classList || new L(t);
}
function L(t) {
  (this._node = t), (this._names = Y(t.getAttribute('class') || ''));
}
function O(t, n) {
  for (var e = H(t), i = -1, r = n.length; ++i < r; ) e.add(n[i]);
}
function z(t, n) {
  for (var e = H(t), i = -1, r = n.length; ++i < r; ) e.remove(n[i]);
}
function j(t) {
  return function () {
    O(this, t);
  };
}
function q(t) {
  return function () {
    z(this, t);
  };
}
function I(t, n) {
  return function () {
    (n.apply(this, arguments) ? O : z)(this, t);
  };
}
function V() {
  this.textContent = '';
}
function X(t) {
  return function () {
    this.textContent = t;
  };
}
function W(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = null == n ? '' : n;
  };
}
function R() {
  this.innerHTML = '';
}
function B(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Z(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = null == n ? '' : n;
  };
}
function $() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function G() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Q() {
  return null;
}
function J() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function K() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function tt() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
L.prototype = {
  add: function (t) {
    this._names.indexOf(t) < 0 &&
      (this._names.push(t),
      this._node.setAttribute('class', this._names.join(' ')));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute('class', this._names.join(' ')));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
var nt = {},
  et = null;
'undefined' != typeof document &&
  ('onmouseenter' in document.documentElement ||
    (nt = { mouseenter: 'mouseover', mouseleave: 'mouseout' }));
function it(t, n, e) {
  return (
    (t = rt(t, n, e)),
    function (n) {
      var e = n.relatedTarget;
      (e && (e === this || 8 & e.compareDocumentPosition(this))) ||
        t.call(this, n);
    }
  );
}
function rt(t, n, e) {
  return function (i) {
    var r = et;
    et = i;
    try {
      t.call(this, this.__data__, n, e);
    } finally {
      et = r;
    }
  };
}
function ot(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var n = '',
        e = t.indexOf('.');
      return (
        e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
        { type: t, name: n }
      );
    });
}
function at(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e, i = 0, r = -1, o = n.length; i < o; ++i)
        (e = n[i]),
          (t.type && e.type !== t.type) || e.name !== t.name
            ? (n[++r] = e)
            : this.removeEventListener(e.type, e.listener, e.capture);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function ut(t, n, e) {
  var i = nt.hasOwnProperty(t.type) ? it : rt;
  return function (r, o, a) {
    var u,
      s = this.__on,
      c = i(n, o, a);
    if (s)
      for (var h = 0, l = s.length; h < l; ++h)
        if ((u = s[h]).type === t.type && u.name === t.name)
          return (
            this.removeEventListener(u.type, u.listener, u.capture),
            this.addEventListener(u.type, (u.listener = c), (u.capture = e)),
            void (u.value = n)
          );
    this.addEventListener(t.type, c, e),
      (u = { type: t.type, name: t.name, value: n, listener: c, capture: e }),
      s ? s.push(u) : (this.__on = [u]);
  };
}
function st(t, n, e, i) {
  var r = et;
  (t.sourceEvent = et), (et = t);
  try {
    return n.apply(e, i);
  } finally {
    et = r;
  }
}
function ct(t, n, e) {
  var i = N(t),
    r = i.CustomEvent;
  'function' == typeof r
    ? (r = new r(n, e))
    : ((r = i.document.createEvent('Event')),
      e
        ? (r.initEvent(n, e.bubbles, e.cancelable), (r.detail = e.detail))
        : r.initEvent(n, !1, !1)),
    t.dispatchEvent(r);
}
function ht(t, n) {
  return function () {
    return ct(this, t, n);
  };
}
function lt(t, n) {
  return function () {
    return ct(this, t, n.apply(this, arguments));
  };
}
var ft = [null];
function _t(t, n) {
  (this._groups = t), (this._parents = n);
}
function pt(t) {
  return 'string' == typeof t
    ? new _t([[document.querySelector(t)]], [document.documentElement])
    : new _t([[t]], ft);
}
_t.prototype = {
  constructor: _t,
  select: function (t) {
    'function' != typeof t && (t = p(t));
    for (
      var n = this._groups, e = n.length, i = new Array(e), r = 0;
      r < e;
      ++r
    )
      for (
        var o, a, u = n[r], s = u.length, c = (i[r] = new Array(s)), h = 0;
        h < s;
        ++h
      )
        (o = u[h]) &&
          (a = t.call(o, o.__data__, h, u)) &&
          ('__data__' in o && (a.__data__ = o.__data__), (c[h] = a));
    return new _t(i, this._parents);
  },
  selectAll: function (t) {
    'function' != typeof t &&
      (t = (function (t) {
        return null == t
          ? y
          : function () {
              return this.querySelectorAll(t);
            };
      })(t));
    for (var n = this._groups, e = n.length, i = [], r = [], o = 0; o < e; ++o)
      for (var a, u = n[o], s = u.length, c = 0; c < s; ++c)
        (a = u[c]) && (i.push(t.call(a, a.__data__, c, u)), r.push(a));
    return new _t(i, r);
  },
  filter: function (t) {
    'function' != typeof t &&
      (t = (function (t) {
        return function () {
          return this.matches(t);
        };
      })(t));
    for (
      var n = this._groups, e = n.length, i = new Array(e), r = 0;
      r < e;
      ++r
    )
      for (var o, a = n[r], u = a.length, s = (i[r] = []), c = 0; c < u; ++c)
        (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
    return new _t(i, this._parents);
  },
  data: function (t, n) {
    if (!t)
      return (
        (_ = new Array(this.size())),
        (c = -1),
        this.each(function (t) {
          _[++c] = t;
        }),
        _
      );
    var e = n ? v : m,
      i = this._parents,
      r = this._groups;
    'function' != typeof t &&
      (t = (function (t) {
        return function () {
          return t;
        };
      })(t));
    for (
      var o = r.length,
        a = new Array(o),
        u = new Array(o),
        s = new Array(o),
        c = 0;
      c < o;
      ++c
    ) {
      var h = i[c],
        l = r[c],
        f = l.length,
        _ = t.call(h, h && h.__data__, c, i),
        p = _.length,
        y = (u[c] = new Array(p)),
        g = (a[c] = new Array(p));
      e(h, l, y, g, (s[c] = new Array(f)), _, n);
      for (var d, x, w = 0, M = 0; w < p; ++w)
        if ((d = y[w])) {
          for (w >= M && (M = w + 1); !(x = g[M]) && ++M < p; );
          d._next = x || null;
        }
    }
    return ((a = new _t(a, i))._enter = u), (a._exit = s), a;
  },
  enter: function () {
    return new _t(this._enter || this._groups.map(g), this._parents);
  },
  exit: function () {
    return new _t(this._exit || this._groups.map(g), this._parents);
  },
  join: function (t, n, e) {
    var i = this.enter(),
      r = this,
      o = this.exit();
    return (
      (i = 'function' == typeof t ? t(i) : i.append(t + '')),
      null != n && (r = n(r)),
      null == e ? o.remove() : e(o),
      i && r ? i.merge(r).order() : r
    );
  },
  merge: function (t) {
    for (
      var n = this._groups,
        e = t._groups,
        i = n.length,
        r = e.length,
        o = Math.min(i, r),
        a = new Array(i),
        u = 0;
      u < o;
      ++u
    )
      for (
        var s,
          c = n[u],
          h = e[u],
          l = c.length,
          f = (a[u] = new Array(l)),
          _ = 0;
        _ < l;
        ++_
      )
        (s = c[_] || h[_]) && (f[_] = s);
    for (; u < i; ++u) a[u] = n[u];
    return new _t(a, this._parents);
  },
  order: function () {
    for (var t = this._groups, n = -1, e = t.length; ++n < e; )
      for (var i, r = t[n], o = r.length - 1, a = r[o]; --o >= 0; )
        (i = r[o]) &&
          (a &&
            4 ^ i.compareDocumentPosition(a) &&
            a.parentNode.insertBefore(i, a),
          (a = i));
    return this;
  },
  sort: function (t) {
    function n(n, e) {
      return n && e ? t(n.__data__, e.__data__) : !n - !e;
    }
    t || (t = x);
    for (
      var e = this._groups, i = e.length, r = new Array(i), o = 0;
      o < i;
      ++o
    ) {
      for (
        var a, u = e[o], s = u.length, c = (r[o] = new Array(s)), h = 0;
        h < s;
        ++h
      )
        (a = u[h]) && (c[h] = a);
      c.sort(n);
    }
    return new _t(r, this._parents).order();
  },
  call: function () {
    var t = arguments[0];
    return (arguments[0] = this), t.apply(null, arguments), this;
  },
  nodes: function () {
    var t = new Array(this.size()),
      n = -1;
    return (
      this.each(function () {
        t[++n] = this;
      }),
      t
    );
  },
  node: function () {
    for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
      for (var i = t[n], r = 0, o = i.length; r < o; ++r) {
        var a = i[r];
        if (a) return a;
      }
    return null;
  },
  size: function () {
    var t = 0;
    return (
      this.each(function () {
        ++t;
      }),
      t
    );
  },
  empty: function () {
    return !this.node();
  },
  each: function (t) {
    for (var n = this._groups, e = 0, i = n.length; e < i; ++e)
      for (var r, o = n[e], a = 0, u = o.length; a < u; ++a)
        (r = o[a]) && t.call(r, r.__data__, a, o);
    return this;
  },
  attr: function (t, n) {
    var e = c(t);
    if (arguments.length < 2) {
      var i = this.node();
      return e.local ? i.getAttributeNS(e.space, e.local) : i.getAttribute(e);
    }
    return this.each(
      (null == n
        ? e.local
          ? M
          : w
        : 'function' == typeof n
        ? e.local
          ? S
          : k
        : e.local
        ? T
        : b)(e, n)
    );
  },
  style: function (t, n, e) {
    return arguments.length > 1
      ? this.each(
          (null == n ? C : 'function' == typeof n ? A : D)(
            t,
            n,
            null == e ? '' : e
          )
        )
      : U(this.node(), t);
  },
  property: function (t, n) {
    return arguments.length > 1
      ? this.each((null == n ? E : 'function' == typeof n ? F : P)(t, n))
      : this.node()[t];
  },
  classed: function (t, n) {
    var e = Y(t + '');
    if (arguments.length < 2) {
      for (var i = H(this.node()), r = -1, o = e.length; ++r < o; )
        if (!i.contains(e[r])) return !1;
      return !0;
    }
    return this.each(('function' == typeof n ? I : n ? j : q)(e, n));
  },
  text: function (t) {
    return arguments.length
      ? this.each(null == t ? V : ('function' == typeof t ? W : X)(t))
      : this.node().textContent;
  },
  html: function (t) {
    return arguments.length
      ? this.each(null == t ? R : ('function' == typeof t ? Z : B)(t))
      : this.node().innerHTML;
  },
  raise: function () {
    return this.each($);
  },
  lower: function () {
    return this.each(G);
  },
  append: function (t) {
    var n = 'function' == typeof t ? t : f(t);
    return this.select(function () {
      return this.appendChild(n.apply(this, arguments));
    });
  },
  insert: function (t, n) {
    var e = 'function' == typeof t ? t : f(t),
      i = null == n ? Q : 'function' == typeof n ? n : p(n);
    return this.select(function () {
      return this.insertBefore(
        e.apply(this, arguments),
        i.apply(this, arguments) || null
      );
    });
  },
  remove: function () {
    return this.each(J);
  },
  clone: function (t) {
    return this.select(t ? tt : K);
  },
  datum: function (t) {
    return arguments.length
      ? this.property('__data__', t)
      : this.node().__data__;
  },
  on: function (t, n, e) {
    var i,
      r,
      o = ot(t + ''),
      a = o.length;
    if (!(arguments.length < 2)) {
      for (u = n ? ut : at, null == e && (e = !1), i = 0; i < a; ++i)
        this.each(u(o[i], n, e));
      return this;
    }
    var u = this.node().__on;
    if (u)
      for (var s, c = 0, h = u.length; c < h; ++c)
        for (i = 0, s = u[c]; i < a; ++i)
          if ((r = o[i]).type === s.type && r.name === s.name) return s.value;
  },
  dispatch: function (t, n) {
    return this.each(('function' == typeof n ? lt : ht)(t, n));
  },
};
var yt = 0;
function gt() {
  this._ = '@' + (++yt).toString(36);
}
function dt() {
  for (var t, n = et; (t = n.sourceEvent); ) n = t;
  return n;
}
function mt(t, n) {
  var e = t.ownerSVGElement || t;
  if (e.createSVGPoint) {
    var i = e.createSVGPoint();
    return (
      (i.x = n.clientX),
      (i.y = n.clientY),
      [(i = i.matrixTransform(t.getScreenCTM().inverse())).x, i.y]
    );
  }
  var r = t.getBoundingClientRect();
  return [n.clientX - r.left - t.clientLeft, n.clientY - r.top - t.clientTop];
}
function vt(t) {
  var n = dt();
  return n.changedTouches && (n = n.changedTouches[0]), mt(t, n);
}
function xt(t, n, e) {
  arguments.length < 3 && ((e = n), (n = dt().changedTouches));
  for (var i, r = 0, o = n ? n.length : 0; r < o; ++r)
    if ((i = n[r]).identifier === e) return mt(t, i);
  return null;
}
function wt(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
gt.prototype = {
  constructor: gt,
  get: function (t) {
    for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return;
    return t[n];
  },
  set: function (t, n) {
    return (t[this._] = n);
  },
  remove: function (t) {
    return this._ in t && delete t[this._];
  },
  toString: function () {
    return this._;
  },
};
var Mt,
  bt,
  Tt =
    (1 === (Mt = wt).length &&
      ((bt = Mt),
      (Mt = function (t, n) {
        return wt(bt(t), n);
      })),
    {
      left: function (t, n, e, i) {
        for (null == e && (e = 0), null == i && (i = t.length); e < i; ) {
          var r = (e + i) >>> 1;
          Mt(t[r], n) < 0 ? (e = r + 1) : (i = r);
        }
        return e;
      },
      right: function (t, n, e, i) {
        for (null == e && (e = 0), null == i && (i = t.length); e < i; ) {
          var r = (e + i) >>> 1;
          Mt(t[r], n) > 0 ? (i = r) : (e = r + 1);
        }
        return e;
      },
    }),
  kt = Tt.right;
var St = Math.sqrt(50),
  Nt = Math.sqrt(10),
  Ct = Math.sqrt(2);
function Dt(t, n, e) {
  var i = (n - t) / Math.max(0, e),
    r = Math.floor(Math.log(i) / Math.LN10),
    o = i / Math.pow(10, r);
  return r >= 0
    ? (o >= St ? 10 : o >= Nt ? 5 : o >= Ct ? 2 : 1) * Math.pow(10, r)
    : -Math.pow(10, -r) / (o >= St ? 10 : o >= Nt ? 5 : o >= Ct ? 2 : 1);
}
function At(t, n) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(n).domain(t);
  }
  return this;
}
var Ut,
  Et = { exports: {} },
  Pt = { exports: {} };
function Ft() {
  return (
    Ut ||
      ((Ut = 1),
      (function (t) {
        function n(t, n, e) {
          (t.prototype = n.prototype = e), (e.constructor = t);
        }
        function e(t, n) {
          var e = Object.create(t.prototype);
          for (var i in n) e[i] = n[i];
          return e;
        }
        function i() {}
        var r = 0.7,
          o = 1 / r,
          a = '\\s*([+-]?\\d+)\\s*',
          u = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
          s = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
          c = /^#([0-9a-f]{3,8})$/,
          h = new RegExp('^rgb\\(' + [a, a, a] + '\\)$'),
          l = new RegExp('^rgb\\(' + [s, s, s] + '\\)$'),
          f = new RegExp('^rgba\\(' + [a, a, a, u] + '\\)$'),
          _ = new RegExp('^rgba\\(' + [s, s, s, u] + '\\)$'),
          p = new RegExp('^hsl\\(' + [u, s, s] + '\\)$'),
          y = new RegExp('^hsla\\(' + [u, s, s, u] + '\\)$'),
          g = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074,
          };
        function d() {
          return this.rgb().formatHex();
        }
        function m() {
          return A(this).formatHsl();
        }
        function v() {
          return this.rgb().formatRgb();
        }
        function x(t) {
          var n, e;
          return (
            (t = (t + '').trim().toLowerCase()),
            (n = c.exec(t))
              ? ((e = n[1].length),
                (n = parseInt(n[1], 16)),
                6 === e
                  ? w(n)
                  : 3 === e
                  ? new k(
                      ((n >> 8) & 15) | ((n >> 4) & 240),
                      ((n >> 4) & 15) | (240 & n),
                      ((15 & n) << 4) | (15 & n),
                      1
                    )
                  : 8 === e
                  ? M(
                      (n >> 24) & 255,
                      (n >> 16) & 255,
                      (n >> 8) & 255,
                      (255 & n) / 255
                    )
                  : 4 === e
                  ? M(
                      ((n >> 12) & 15) | ((n >> 8) & 240),
                      ((n >> 8) & 15) | ((n >> 4) & 240),
                      ((n >> 4) & 15) | (240 & n),
                      (((15 & n) << 4) | (15 & n)) / 255
                    )
                  : null)
              : (n = h.exec(t))
              ? new k(n[1], n[2], n[3], 1)
              : (n = l.exec(t))
              ? new k(
                  (255 * n[1]) / 100,
                  (255 * n[2]) / 100,
                  (255 * n[3]) / 100,
                  1
                )
              : (n = f.exec(t))
              ? M(n[1], n[2], n[3], n[4])
              : (n = _.exec(t))
              ? M(
                  (255 * n[1]) / 100,
                  (255 * n[2]) / 100,
                  (255 * n[3]) / 100,
                  n[4]
                )
              : (n = p.exec(t))
              ? D(n[1], n[2] / 100, n[3] / 100, 1)
              : (n = y.exec(t))
              ? D(n[1], n[2] / 100, n[3] / 100, n[4])
              : g.hasOwnProperty(t)
              ? w(g[t])
              : 'transparent' === t
              ? new k(NaN, NaN, NaN, 0)
              : null
          );
        }
        function w(t) {
          return new k((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
        }
        function M(t, n, e, i) {
          return i <= 0 && (t = n = e = NaN), new k(t, n, e, i);
        }
        function b(t) {
          return (
            t instanceof i || (t = x(t)),
            t ? new k((t = t.rgb()).r, t.g, t.b, t.opacity) : new k()
          );
        }
        function T(t, n, e, i) {
          return 1 === arguments.length
            ? b(t)
            : new k(t, n, e, null == i ? 1 : i);
        }
        function k(t, n, e, i) {
          (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +i);
        }
        function S() {
          return '#' + C(this.r) + C(this.g) + C(this.b);
        }
        function N() {
          var t = this.opacity;
          return (
            (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
              ? 'rgb('
              : 'rgba(') +
            Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
            ', ' +
            Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
            ', ' +
            Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
            (1 === t ? ')' : ', ' + t + ')')
          );
        }
        function C(t) {
          return (
            ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16
              ? '0'
              : '') + t.toString(16)
          );
        }
        function D(t, n, e, i) {
          return (
            i <= 0
              ? (t = n = e = NaN)
              : e <= 0 || e >= 1
              ? (t = n = NaN)
              : n <= 0 && (t = NaN),
            new E(t, n, e, i)
          );
        }
        function A(t) {
          if (t instanceof E) return new E(t.h, t.s, t.l, t.opacity);
          if ((t instanceof i || (t = x(t)), !t)) return new E();
          if (t instanceof E) return t;
          var n = (t = t.rgb()).r / 255,
            e = t.g / 255,
            r = t.b / 255,
            o = Math.min(n, e, r),
            a = Math.max(n, e, r),
            u = NaN,
            s = a - o,
            c = (a + o) / 2;
          return (
            s
              ? ((u =
                  n === a
                    ? (e - r) / s + 6 * (e < r)
                    : e === a
                    ? (r - n) / s + 2
                    : (n - e) / s + 4),
                (s /= c < 0.5 ? a + o : 2 - a - o),
                (u *= 60))
              : (s = c > 0 && c < 1 ? 0 : u),
            new E(u, s, c, t.opacity)
          );
        }
        function U(t, n, e, i) {
          return 1 === arguments.length
            ? A(t)
            : new E(t, n, e, null == i ? 1 : i);
        }
        function E(t, n, e, i) {
          (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +i);
        }
        function P(t, n, e) {
          return (
            255 *
            (t < 60
              ? n + ((e - n) * t) / 60
              : t < 180
              ? e
              : t < 240
              ? n + ((e - n) * (240 - t)) / 60
              : n)
          );
        }
        n(i, x, {
          copy: function (t) {
            return Object.assign(new this.constructor(), this, t);
          },
          displayable: function () {
            return this.rgb().displayable();
          },
          hex: d,
          formatHex: d,
          formatHsl: m,
          formatRgb: v,
          toString: v,
        }),
          n(
            k,
            T,
            e(i, {
              brighter: function (t) {
                return (
                  (t = null == t ? o : Math.pow(o, t)),
                  new k(this.r * t, this.g * t, this.b * t, this.opacity)
                );
              },
              darker: function (t) {
                return (
                  (t = null == t ? r : Math.pow(r, t)),
                  new k(this.r * t, this.g * t, this.b * t, this.opacity)
                );
              },
              rgb: function () {
                return this;
              },
              displayable: function () {
                return (
                  -0.5 <= this.r &&
                  this.r < 255.5 &&
                  -0.5 <= this.g &&
                  this.g < 255.5 &&
                  -0.5 <= this.b &&
                  this.b < 255.5 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              hex: S,
              formatHex: S,
              formatRgb: N,
              toString: N,
            })
          ),
          n(
            E,
            U,
            e(i, {
              brighter: function (t) {
                return (
                  (t = null == t ? o : Math.pow(o, t)),
                  new E(this.h, this.s, this.l * t, this.opacity)
                );
              },
              darker: function (t) {
                return (
                  (t = null == t ? r : Math.pow(r, t)),
                  new E(this.h, this.s, this.l * t, this.opacity)
                );
              },
              rgb: function () {
                var t = (this.h % 360) + 360 * (this.h < 0),
                  n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                  e = this.l,
                  i = e + (e < 0.5 ? e : 1 - e) * n,
                  r = 2 * e - i;
                return new k(
                  P(t >= 240 ? t - 240 : t + 120, r, i),
                  P(t, r, i),
                  P(t < 120 ? t + 240 : t - 120, r, i),
                  this.opacity
                );
              },
              displayable: function () {
                return (
                  ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                  0 <= this.l &&
                  this.l <= 1 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              formatHsl: function () {
                var t = this.opacity;
                return (
                  (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                    ? 'hsl('
                    : 'hsla(') +
                  (this.h || 0) +
                  ', ' +
                  100 * (this.s || 0) +
                  '%, ' +
                  100 * (this.l || 0) +
                  '%' +
                  (1 === t ? ')' : ', ' + t + ')')
                );
              },
            })
          );
        var F = Math.PI / 180,
          Y = 180 / Math.PI,
          H = 18,
          L = 0.96422,
          O = 1,
          z = 0.82521,
          j = 4 / 29,
          q = 6 / 29,
          I = 3 * q * q,
          V = q * q * q;
        function X(t) {
          if (t instanceof B) return new B(t.l, t.a, t.b, t.opacity);
          if (t instanceof nt) return et(t);
          t instanceof k || (t = b(t));
          var n,
            e,
            i = Q(t.r),
            r = Q(t.g),
            o = Q(t.b),
            a = Z((0.2225045 * i + 0.7168786 * r + 0.0606169 * o) / O);
          return (
            i === r && r === o
              ? (n = e = a)
              : ((n = Z((0.4360747 * i + 0.3850649 * r + 0.1430804 * o) / L)),
                (e = Z((0.0139322 * i + 0.0971045 * r + 0.7141733 * o) / z))),
            new B(116 * a - 16, 500 * (n - a), 200 * (a - e), t.opacity)
          );
        }
        function W(t, n) {
          return new B(t, 0, 0, null == n ? 1 : n);
        }
        function R(t, n, e, i) {
          return 1 === arguments.length
            ? X(t)
            : new B(t, n, e, null == i ? 1 : i);
        }
        function B(t, n, e, i) {
          (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +i);
        }
        function Z(t) {
          return t > V ? Math.pow(t, 1 / 3) : t / I + j;
        }
        function $(t) {
          return t > q ? t * t * t : I * (t - j);
        }
        function G(t) {
          return (
            255 *
            (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
          );
        }
        function Q(t) {
          return (t /= 255) <= 0.04045
            ? t / 12.92
            : Math.pow((t + 0.055) / 1.055, 2.4);
        }
        function J(t) {
          if (t instanceof nt) return new nt(t.h, t.c, t.l, t.opacity);
          if ((t instanceof B || (t = X(t)), 0 === t.a && 0 === t.b))
            return new nt(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
          var n = Math.atan2(t.b, t.a) * Y;
          return new nt(
            n < 0 ? n + 360 : n,
            Math.sqrt(t.a * t.a + t.b * t.b),
            t.l,
            t.opacity
          );
        }
        function K(t, n, e, i) {
          return 1 === arguments.length
            ? J(t)
            : new nt(e, n, t, null == i ? 1 : i);
        }
        function tt(t, n, e, i) {
          return 1 === arguments.length
            ? J(t)
            : new nt(t, n, e, null == i ? 1 : i);
        }
        function nt(t, n, e, i) {
          (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +i);
        }
        function et(t) {
          if (isNaN(t.h)) return new B(t.l, 0, 0, t.opacity);
          var n = t.h * F;
          return new B(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
        }
        n(
          B,
          R,
          e(i, {
            brighter: function (t) {
              return new B(
                this.l + H * (null == t ? 1 : t),
                this.a,
                this.b,
                this.opacity
              );
            },
            darker: function (t) {
              return new B(
                this.l - H * (null == t ? 1 : t),
                this.a,
                this.b,
                this.opacity
              );
            },
            rgb: function () {
              var t = (this.l + 16) / 116,
                n = isNaN(this.a) ? t : t + this.a / 500,
                e = isNaN(this.b) ? t : t - this.b / 200;
              return new k(
                G(
                  3.1338561 * (n = L * $(n)) -
                    1.6168667 * (t = O * $(t)) -
                    0.4906146 * (e = z * $(e))
                ),
                G(-0.9787684 * n + 1.9161415 * t + 0.033454 * e),
                G(0.0719453 * n - 0.2289914 * t + 1.4052427 * e),
                this.opacity
              );
            },
          })
        ),
          n(
            nt,
            tt,
            e(i, {
              brighter: function (t) {
                return new nt(
                  this.h,
                  this.c,
                  this.l + H * (null == t ? 1 : t),
                  this.opacity
                );
              },
              darker: function (t) {
                return new nt(
                  this.h,
                  this.c,
                  this.l - H * (null == t ? 1 : t),
                  this.opacity
                );
              },
              rgb: function () {
                return et(this).rgb();
              },
            })
          );
        var it = -0.14861,
          rt = 1.78277,
          ot = -0.29227,
          at = -0.90649,
          ut = 1.97294,
          st = ut * at,
          ct = ut * rt,
          ht = rt * ot - at * it;
        function lt(t) {
          if (t instanceof _t) return new _t(t.h, t.s, t.l, t.opacity);
          t instanceof k || (t = b(t));
          var n = t.r / 255,
            e = t.g / 255,
            i = t.b / 255,
            r = (ht * i + st * n - ct * e) / (ht + st - ct),
            o = i - r,
            a = (ut * (e - r) - ot * o) / at,
            u = Math.sqrt(a * a + o * o) / (ut * r * (1 - r)),
            s = u ? Math.atan2(a, o) * Y - 120 : NaN;
          return new _t(s < 0 ? s + 360 : s, u, r, t.opacity);
        }
        function ft(t, n, e, i) {
          return 1 === arguments.length
            ? lt(t)
            : new _t(t, n, e, null == i ? 1 : i);
        }
        function _t(t, n, e, i) {
          (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +i);
        }
        n(
          _t,
          ft,
          e(i, {
            brighter: function (t) {
              return (
                (t = null == t ? o : Math.pow(o, t)),
                new _t(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? r : Math.pow(r, t)),
                new _t(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb: function () {
              var t = isNaN(this.h) ? 0 : (this.h + 120) * F,
                n = +this.l,
                e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
                i = Math.cos(t),
                r = Math.sin(t);
              return new k(
                255 * (n + e * (it * i + rt * r)),
                255 * (n + e * (ot * i + at * r)),
                255 * (n + e * (ut * i)),
                this.opacity
              );
            },
          })
        ),
          (t.color = x),
          (t.cubehelix = ft),
          (t.gray = W),
          (t.hcl = tt),
          (t.hsl = U),
          (t.lab = R),
          (t.lch = K),
          (t.rgb = T),
          Object.defineProperty(t, '__esModule', { value: !0 });
      })(Pt.exports)),
    Pt.exports
  );
}
function Yt(t) {
  return +t;
}
!(function (t, n) {
  function e(t, n, e, i, r) {
    var o = t * t,
      a = o * t;
    return (
      ((1 - 3 * t + 3 * o - a) * n +
        (4 - 6 * o + 3 * a) * e +
        (1 + 3 * t + 3 * o - 3 * a) * i +
        a * r) /
      6
    );
  }
  function i(t) {
    var n = t.length - 1;
    return function (i) {
      var r = i <= 0 ? (i = 0) : i >= 1 ? ((i = 1), n - 1) : Math.floor(i * n),
        o = t[r],
        a = t[r + 1],
        u = r > 0 ? t[r - 1] : 2 * o - a,
        s = r < n - 1 ? t[r + 2] : 2 * a - o;
      return e((i - r / n) * n, u, o, a, s);
    };
  }
  function r(t) {
    var n = t.length;
    return function (i) {
      var r = Math.floor(((i %= 1) < 0 ? ++i : i) * n),
        o = t[(r + n - 1) % n],
        a = t[r % n],
        u = t[(r + 1) % n],
        s = t[(r + 2) % n];
      return e((i - r / n) * n, o, a, u, s);
    };
  }
  function o(t) {
    return function () {
      return t;
    };
  }
  function a(t, n) {
    return function (e) {
      return t + e * n;
    };
  }
  function u(t, n, e) {
    return (
      (t = Math.pow(t, e)),
      (n = Math.pow(n, e) - t),
      (e = 1 / e),
      function (i) {
        return Math.pow(t + i * n, e);
      }
    );
  }
  function s(t, n) {
    var e = n - t;
    return e
      ? a(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
      : o(isNaN(t) ? n : t);
  }
  function c(t) {
    return 1 == (t = +t)
      ? h
      : function (n, e) {
          return e - n ? u(n, e, t) : o(isNaN(n) ? e : n);
        };
  }
  function h(t, n) {
    var e = n - t;
    return e ? a(t, e) : o(isNaN(t) ? n : t);
  }
  var l = (function t(e) {
    var i = c(e);
    function r(t, e) {
      var r = i((t = n.rgb(t)).r, (e = n.rgb(e)).r),
        o = i(t.g, e.g),
        a = i(t.b, e.b),
        u = h(t.opacity, e.opacity);
      return function (n) {
        return (
          (t.r = r(n)), (t.g = o(n)), (t.b = a(n)), (t.opacity = u(n)), t + ''
        );
      };
    }
    return (r.gamma = t), r;
  })(1);
  function f(t) {
    return function (e) {
      var i,
        r,
        o = e.length,
        a = new Array(o),
        u = new Array(o),
        s = new Array(o);
      for (i = 0; i < o; ++i)
        (r = n.rgb(e[i])),
          (a[i] = r.r || 0),
          (u[i] = r.g || 0),
          (s[i] = r.b || 0);
      return (
        (a = t(a)),
        (u = t(u)),
        (s = t(s)),
        (r.opacity = 1),
        function (t) {
          return (r.r = a(t)), (r.g = u(t)), (r.b = s(t)), r + '';
        }
      );
    };
  }
  var _ = f(i),
    p = f(r);
  function y(t, n) {
    n || (n = []);
    var e,
      i = t ? Math.min(n.length, t.length) : 0,
      r = n.slice();
    return function (o) {
      for (e = 0; e < i; ++e) r[e] = t[e] * (1 - o) + n[e] * o;
      return r;
    };
  }
  function g(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
  }
  function d(t, n) {
    return (g(n) ? y : m)(t, n);
  }
  function m(t, n) {
    var e,
      i = n ? n.length : 0,
      r = t ? Math.min(i, t.length) : 0,
      o = new Array(r),
      a = new Array(i);
    for (e = 0; e < r; ++e) o[e] = N(t[e], n[e]);
    for (; e < i; ++e) a[e] = n[e];
    return function (t) {
      for (e = 0; e < r; ++e) a[e] = o[e](t);
      return a;
    };
  }
  function v(t, n) {
    var e = new Date();
    return (
      (t = +t),
      (n = +n),
      function (i) {
        return e.setTime(t * (1 - i) + n * i), e;
      }
    );
  }
  function x(t, n) {
    return (
      (t = +t),
      (n = +n),
      function (e) {
        return t * (1 - e) + n * e;
      }
    );
  }
  function w(t, n) {
    var e,
      i = {},
      r = {};
    for (e in ((null !== t && 'object' == typeof t) || (t = {}),
    (null !== n && 'object' == typeof n) || (n = {}),
    n))
      e in t ? (i[e] = N(t[e], n[e])) : (r[e] = n[e]);
    return function (t) {
      for (e in i) r[e] = i[e](t);
      return r;
    };
  }
  var M = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    b = new RegExp(M.source, 'g');
  function T(t) {
    return function () {
      return t;
    };
  }
  function k(t) {
    return function (n) {
      return t(n) + '';
    };
  }
  function S(t, n) {
    var e,
      i,
      r,
      o = (M.lastIndex = b.lastIndex = 0),
      a = -1,
      u = [],
      s = [];
    for (t += '', n += ''; (e = M.exec(t)) && (i = b.exec(n)); )
      (r = i.index) > o &&
        ((r = n.slice(o, r)), u[a] ? (u[a] += r) : (u[++a] = r)),
        (e = e[0]) === (i = i[0])
          ? u[a]
            ? (u[a] += i)
            : (u[++a] = i)
          : ((u[++a] = null), s.push({ i: a, x: x(e, i) })),
        (o = b.lastIndex);
    return (
      o < n.length && ((r = n.slice(o)), u[a] ? (u[a] += r) : (u[++a] = r)),
      u.length < 2
        ? s[0]
          ? k(s[0].x)
          : T(n)
        : ((n = s.length),
          function (t) {
            for (var e, i = 0; i < n; ++i) u[(e = s[i]).i] = e.x(t);
            return u.join('');
          })
    );
  }
  function N(t, e) {
    var i,
      r = typeof e;
    return null == e || 'boolean' === r
      ? o(e)
      : ('number' === r
          ? x
          : 'string' === r
          ? (i = n.color(e))
            ? ((e = i), l)
            : S
          : e instanceof n.color
          ? l
          : e instanceof Date
          ? v
          : g(e)
          ? y
          : Array.isArray(e)
          ? m
          : ('function' != typeof e.valueOf &&
              'function' != typeof e.toString) ||
            isNaN(e)
          ? w
          : x)(t, e);
  }
  function C(t) {
    var n = t.length;
    return function (e) {
      return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
    };
  }
  function D(t, n) {
    var e = s(+t, +n);
    return function (t) {
      var n = e(t);
      return n - 360 * Math.floor(n / 360);
    };
  }
  function A(t, n) {
    return (
      (t = +t),
      (n = +n),
      function (e) {
        return Math.round(t * (1 - e) + n * e);
      }
    );
  }
  var U,
    E,
    P,
    F,
    Y = 180 / Math.PI,
    H = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1,
    };
  function L(t, n, e, i, r, o) {
    var a, u, s;
    return (
      (a = Math.sqrt(t * t + n * n)) && ((t /= a), (n /= a)),
      (s = t * e + n * i) && ((e -= t * s), (i -= n * s)),
      (u = Math.sqrt(e * e + i * i)) && ((e /= u), (i /= u), (s /= u)),
      t * i < n * e && ((t = -t), (n = -n), (s = -s), (a = -a)),
      {
        translateX: r,
        translateY: o,
        rotate: Math.atan2(n, t) * Y,
        skewX: Math.atan(s) * Y,
        scaleX: a,
        scaleY: u,
      }
    );
  }
  function O(t) {
    return 'none' === t
      ? H
      : (U ||
          ((U = document.createElement('DIV')),
          (E = document.documentElement),
          (P = document.defaultView)),
        (U.style.transform = t),
        (t = P.getComputedStyle(E.appendChild(U), null).getPropertyValue(
          'transform'
        )),
        E.removeChild(U),
        L(
          +(t = t.slice(7, -1).split(','))[0],
          +t[1],
          +t[2],
          +t[3],
          +t[4],
          +t[5]
        ));
  }
  function z(t) {
    return null == t
      ? H
      : (F || (F = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
        F.setAttribute('transform', t),
        (t = F.transform.baseVal.consolidate())
          ? L((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
          : H);
  }
  function j(t, n, e, i) {
    function r(t) {
      return t.length ? t.pop() + ' ' : '';
    }
    function o(t, i, r, o, a, u) {
      if (t !== r || i !== o) {
        var s = a.push('translate(', null, n, null, e);
        u.push({ i: s - 4, x: x(t, r) }, { i: s - 2, x: x(i, o) });
      } else (r || o) && a.push('translate(' + r + n + o + e);
    }
    function a(t, n, e, o) {
      t !== n
        ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
          o.push({ i: e.push(r(e) + 'rotate(', null, i) - 2, x: x(t, n) }))
        : n && e.push(r(e) + 'rotate(' + n + i);
    }
    function u(t, n, e, o) {
      t !== n
        ? o.push({ i: e.push(r(e) + 'skewX(', null, i) - 2, x: x(t, n) })
        : n && e.push(r(e) + 'skewX(' + n + i);
    }
    function s(t, n, e, i, o, a) {
      if (t !== e || n !== i) {
        var u = o.push(r(o) + 'scale(', null, ',', null, ')');
        a.push({ i: u - 4, x: x(t, e) }, { i: u - 2, x: x(n, i) });
      } else
        (1 === e && 1 === i) || o.push(r(o) + 'scale(' + e + ',' + i + ')');
    }
    return function (n, e) {
      var i = [],
        r = [];
      return (
        (n = t(n)),
        (e = t(e)),
        o(n.translateX, n.translateY, e.translateX, e.translateY, i, r),
        a(n.rotate, e.rotate, i, r),
        u(n.skewX, e.skewX, i, r),
        s(n.scaleX, n.scaleY, e.scaleX, e.scaleY, i, r),
        (n = e = null),
        function (t) {
          for (var n, e = -1, o = r.length; ++e < o; ) i[(n = r[e]).i] = n.x(t);
          return i.join('');
        }
      );
    };
  }
  var q = j(O, 'px, ', 'px)', 'deg)'),
    I = j(z, ', ', ')', ')'),
    V = Math.SQRT2,
    X = 2,
    W = 4,
    R = 1e-12;
  function B(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2;
  }
  function Z(t) {
    return ((t = Math.exp(t)) - 1 / t) / 2;
  }
  function $(t) {
    return ((t = Math.exp(2 * t)) - 1) / (t + 1);
  }
  function G(t, n) {
    var e,
      i,
      r = t[0],
      o = t[1],
      a = t[2],
      u = n[0],
      s = n[1],
      c = n[2],
      h = u - r,
      l = s - o,
      f = h * h + l * l;
    if (f < R)
      (i = Math.log(c / a) / V),
        (e = function (t) {
          return [r + t * h, o + t * l, a * Math.exp(V * t * i)];
        });
    else {
      var _ = Math.sqrt(f),
        p = (c * c - a * a + W * f) / (2 * a * X * _),
        y = (c * c - a * a - W * f) / (2 * c * X * _),
        g = Math.log(Math.sqrt(p * p + 1) - p),
        d = Math.log(Math.sqrt(y * y + 1) - y);
      (i = (d - g) / V),
        (e = function (t) {
          var n = t * i,
            e = B(g),
            u = (a / (X * _)) * (e * $(V * n + g) - Z(g));
          return [r + u * h, o + u * l, (a * e) / B(V * n + g)];
        });
    }
    return (e.duration = 1e3 * i), e;
  }
  function Q(t) {
    return function (e, i) {
      var r = t((e = n.hsl(e)).h, (i = n.hsl(i)).h),
        o = h(e.s, i.s),
        a = h(e.l, i.l),
        u = h(e.opacity, i.opacity);
      return function (t) {
        return (
          (e.h = r(t)), (e.s = o(t)), (e.l = a(t)), (e.opacity = u(t)), e + ''
        );
      };
    };
  }
  var J = Q(s),
    K = Q(h);
  function tt(t, e) {
    var i = h((t = n.lab(t)).l, (e = n.lab(e)).l),
      r = h(t.a, e.a),
      o = h(t.b, e.b),
      a = h(t.opacity, e.opacity);
    return function (n) {
      return (
        (t.l = i(n)), (t.a = r(n)), (t.b = o(n)), (t.opacity = a(n)), t + ''
      );
    };
  }
  function nt(t) {
    return function (e, i) {
      var r = t((e = n.hcl(e)).h, (i = n.hcl(i)).h),
        o = h(e.c, i.c),
        a = h(e.l, i.l),
        u = h(e.opacity, i.opacity);
      return function (t) {
        return (
          (e.h = r(t)), (e.c = o(t)), (e.l = a(t)), (e.opacity = u(t)), e + ''
        );
      };
    };
  }
  var et = nt(s),
    it = nt(h);
  function rt(t) {
    return (function e(i) {
      function r(e, r) {
        var o = t((e = n.cubehelix(e)).h, (r = n.cubehelix(r)).h),
          a = h(e.s, r.s),
          u = h(e.l, r.l),
          s = h(e.opacity, r.opacity);
        return function (t) {
          return (
            (e.h = o(t)),
            (e.s = a(t)),
            (e.l = u(Math.pow(t, i))),
            (e.opacity = s(t)),
            e + ''
          );
        };
      }
      return (i = +i), (r.gamma = e), r;
    })(1);
  }
  var ot = rt(s),
    at = rt(h);
  function ut(t, n) {
    for (
      var e = 0, i = n.length - 1, r = n[0], o = new Array(i < 0 ? 0 : i);
      e < i;

    )
      o[e] = t(r, (r = n[++e]));
    return function (t) {
      var n = Math.max(0, Math.min(i - 1, Math.floor((t *= i))));
      return o[n](t - n);
    };
  }
  function st(t, n) {
    for (var e = new Array(n), i = 0; i < n; ++i) e[i] = t(i / (n - 1));
    return e;
  }
  (t.interpolate = N),
    (t.interpolateArray = d),
    (t.interpolateBasis = i),
    (t.interpolateBasisClosed = r),
    (t.interpolateCubehelix = ot),
    (t.interpolateCubehelixLong = at),
    (t.interpolateDate = v),
    (t.interpolateDiscrete = C),
    (t.interpolateHcl = et),
    (t.interpolateHclLong = it),
    (t.interpolateHsl = J),
    (t.interpolateHslLong = K),
    (t.interpolateHue = D),
    (t.interpolateLab = tt),
    (t.interpolateNumber = x),
    (t.interpolateNumberArray = y),
    (t.interpolateObject = w),
    (t.interpolateRgb = l),
    (t.interpolateRgbBasis = _),
    (t.interpolateRgbBasisClosed = p),
    (t.interpolateRound = A),
    (t.interpolateString = S),
    (t.interpolateTransformCss = q),
    (t.interpolateTransformSvg = I),
    (t.interpolateZoom = G),
    (t.piecewise = ut),
    (t.quantize = st),
    Object.defineProperty(t, '__esModule', { value: !0 });
})(Et.exports, Ft());
var Ht = [0, 1];
function Lt(t) {
  return t;
}
function Ot(t, n) {
  return (n -= t = +t)
    ? function (e) {
        return (e - t) / n;
      }
    : (function (t) {
        return function () {
          return t;
        };
      })(isNaN(n) ? NaN : 0.5);
}
function zt(t, n, e) {
  var i = t[0],
    r = t[1],
    o = n[0],
    a = n[1];
  return (
    r < i ? ((i = Ot(r, i)), (o = e(a, o))) : ((i = Ot(i, r)), (o = e(o, a))),
    function (t) {
      return o(i(t));
    }
  );
}
function jt(t, n, e) {
  var i = Math.min(t.length, n.length) - 1,
    r = new Array(i),
    o = new Array(i),
    a = -1;
  for (
    t[i] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
    ++a < i;

  )
    (r[a] = Ot(t[a], t[a + 1])), (o[a] = e(n[a], n[a + 1]));
  return function (n) {
    var e = kt(t, n, 1, i) - 1;
    return o[e](r[e](n));
  };
}
function qt(t, n) {
  return n
    .domain(t.domain())
    .range(t.range())
    .interpolate(t.interpolate())
    .clamp(t.clamp())
    .unknown(t.unknown());
}
function It() {
  var t,
    n,
    e,
    i,
    r,
    o,
    a = Ht,
    u = Ht,
    s = Et.exports.interpolate,
    c = Lt;
  function h() {
    var t,
      n,
      e,
      s = Math.min(a.length, u.length);
    return (
      c !== Lt &&
        ((t = a[0]),
        (n = a[s - 1]),
        t > n && ((e = t), (t = n), (n = e)),
        (c = function (e) {
          return Math.max(t, Math.min(n, e));
        })),
      (i = s > 2 ? jt : zt),
      (r = o = null),
      l
    );
  }
  function l(n) {
    return isNaN((n = +n)) ? e : (r || (r = i(a.map(t), u, s)))(t(c(n)));
  }
  return (
    (l.invert = function (e) {
      return c(n((o || (o = i(u, a.map(t), Et.exports.interpolateNumber)))(e)));
    }),
    (l.domain = function (t) {
      return arguments.length ? ((a = Array.from(t, Yt)), h()) : a.slice();
    }),
    (l.range = function (t) {
      return arguments.length ? ((u = Array.from(t)), h()) : u.slice();
    }),
    (l.rangeRound = function (t) {
      return (u = Array.from(t)), (s = Et.exports.interpolateRound), h();
    }),
    (l.clamp = function (t) {
      return arguments.length ? ((c = !!t || Lt), h()) : c !== Lt;
    }),
    (l.interpolate = function (t) {
      return arguments.length ? ((s = t), h()) : s;
    }),
    (l.unknown = function (t) {
      return arguments.length ? ((e = t), l) : e;
    }),
    function (e, i) {
      return (t = e), (n = i), h();
    }
  );
}
function Vt() {
  return It()(Lt, Lt);
}
var Xt = { exports: {} };
function Wt(t, n, e, i) {
  var r,
    o = (function (t, n, e) {
      var i = Math.abs(n - t) / Math.max(0, e),
        r = Math.pow(10, Math.floor(Math.log(i) / Math.LN10)),
        o = i / r;
      return (
        o >= St ? (r *= 10) : o >= Nt ? (r *= 5) : o >= Ct && (r *= 2),
        n < t ? -r : r
      );
    })(t, n, e);
  switch ((i = Xt.exports.formatSpecifier(null == i ? ',f' : i)).type) {
    case 's':
      var a = Math.max(Math.abs(t), Math.abs(n));
      return (
        null != i.precision ||
          isNaN((r = Xt.exports.precisionPrefix(o, a))) ||
          (i.precision = r),
        Xt.exports.formatPrefix(i, a)
      );
    case '':
    case 'e':
    case 'g':
    case 'p':
    case 'r':
      null != i.precision ||
        isNaN(
          (r = Xt.exports.precisionRound(o, Math.max(Math.abs(t), Math.abs(n))))
        ) ||
        (i.precision = r - ('e' === i.type));
      break;
    case 'f':
    case '%':
      null != i.precision ||
        isNaN((r = Xt.exports.precisionFixed(o))) ||
        (i.precision = r - 2 * ('%' === i.type));
  }
  return Xt.exports.format(i);
}
function Rt(t) {
  var n = t.domain;
  return (
    (t.ticks = function (t) {
      var e = n();
      return (function (t, n, e) {
        var i,
          r,
          o,
          a,
          u = -1;
        if (((e = +e), (t = +t) == (n = +n) && e > 0)) return [t];
        if (
          ((i = n < t) && ((r = t), (t = n), (n = r)),
          0 === (a = Dt(t, n, e)) || !isFinite(a))
        )
          return [];
        if (a > 0)
          for (
            t = Math.ceil(t / a),
              n = Math.floor(n / a),
              o = new Array((r = Math.ceil(n - t + 1)));
            ++u < r;

          )
            o[u] = (t + u) * a;
        else
          for (
            t = Math.floor(t * a),
              n = Math.ceil(n * a),
              o = new Array((r = Math.ceil(t - n + 1)));
            ++u < r;

          )
            o[u] = (t - u) / a;
        return i && o.reverse(), o;
      })(e[0], e[e.length - 1], null == t ? 10 : t);
    }),
    (t.tickFormat = function (t, e) {
      var i = n();
      return Wt(i[0], i[i.length - 1], null == t ? 10 : t, e);
    }),
    (t.nice = function (e) {
      null == e && (e = 10);
      var i,
        r = n(),
        o = 0,
        a = r.length - 1,
        u = r[o],
        s = r[a];
      return (
        s < u && ((i = u), (u = s), (s = i), (i = o), (o = a), (a = i)),
        (i = Dt(u, s, e)) > 0
          ? (i = Dt((u = Math.floor(u / i) * i), (s = Math.ceil(s / i) * i), e))
          : i < 0 &&
            (i = Dt(
              (u = Math.ceil(u * i) / i),
              (s = Math.floor(s * i) / i),
              e
            )),
        i > 0
          ? ((r[o] = Math.floor(u / i) * i),
            (r[a] = Math.ceil(s / i) * i),
            n(r))
          : i < 0 &&
            ((r[o] = Math.ceil(u * i) / i),
            (r[a] = Math.floor(s * i) / i),
            n(r)),
        t
      );
    }),
    t
  );
}
function Bt() {
  var t = Vt();
  return (
    (t.copy = function () {
      return qt(t, Bt());
    }),
    At.apply(t, arguments),
    Rt(t)
  );
}
!(function (t) {
  function n(t) {
    return Math.abs((t = Math.round(t))) >= 1e21
      ? t.toLocaleString('en').replace(/,/g, '')
      : t.toString(10);
  }
  function e(t, n) {
    if (
      (e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf('e')) <
      0
    )
      return null;
    var e,
      i = t.slice(0, e);
    return [i.length > 1 ? i[0] + i.slice(2) : i, +t.slice(e + 1)];
  }
  function i(t) {
    return (t = e(Math.abs(t))) ? t[1] : NaN;
  }
  function r(t, n) {
    return function (e, i) {
      for (
        var r = e.length, o = [], a = 0, u = t[0], s = 0;
        r > 0 &&
        u > 0 &&
        (s + u + 1 > i && (u = Math.max(1, i - s)),
        o.push(e.substring((r -= u), r + u)),
        !((s += u + 1) > i));

      )
        u = t[(a = (a + 1) % t.length)];
      return o.reverse().join(n);
    };
  }
  function o(t) {
    return function (n) {
      return n.replace(/[0-9]/g, function (n) {
        return t[+n];
      });
    };
  }
  var a,
    u =
      /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function s(t) {
    if (!(n = u.exec(t))) throw new Error('invalid format: ' + t);
    var n;
    return new c({
      fill: n[1],
      align: n[2],
      sign: n[3],
      symbol: n[4],
      zero: n[5],
      width: n[6],
      comma: n[7],
      precision: n[8] && n[8].slice(1),
      trim: n[9],
      type: n[10],
    });
  }
  function c(t) {
    (this.fill = void 0 === t.fill ? ' ' : t.fill + ''),
      (this.align = void 0 === t.align ? '>' : t.align + ''),
      (this.sign = void 0 === t.sign ? '-' : t.sign + ''),
      (this.symbol = void 0 === t.symbol ? '' : t.symbol + ''),
      (this.zero = !!t.zero),
      (this.width = void 0 === t.width ? void 0 : +t.width),
      (this.comma = !!t.comma),
      (this.precision = void 0 === t.precision ? void 0 : +t.precision),
      (this.trim = !!t.trim),
      (this.type = void 0 === t.type ? '' : t.type + '');
  }
  function h(t) {
    t: for (var n, e = t.length, i = 1, r = -1; i < e; ++i)
      switch (t[i]) {
        case '.':
          r = n = i;
          break;
        case '0':
          0 === r && (r = i), (n = i);
          break;
        default:
          if (!+t[i]) break t;
          r > 0 && (r = 0);
      }
    return r > 0 ? t.slice(0, r) + t.slice(n + 1) : t;
  }
  function l(t, n) {
    var i = e(t, n);
    if (!i) return t + '';
    var r = i[0],
      o = i[1],
      u = o - (a = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
      s = r.length;
    return u === s
      ? r
      : u > s
      ? r + new Array(u - s + 1).join('0')
      : u > 0
      ? r.slice(0, u) + '.' + r.slice(u)
      : '0.' + new Array(1 - u).join('0') + e(t, Math.max(0, n + u - 1))[0];
  }
  function f(t, n) {
    var i = e(t, n);
    if (!i) return t + '';
    var r = i[0],
      o = i[1];
    return o < 0
      ? '0.' + new Array(-o).join('0') + r
      : r.length > o + 1
      ? r.slice(0, o + 1) + '.' + r.slice(o + 1)
      : r + new Array(o - r.length + 2).join('0');
  }
  (s.prototype = c.prototype),
    (c.prototype.toString = function () {
      return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? '0' : '') +
        (void 0 === this.width ? '' : Math.max(1, 0 | this.width)) +
        (this.comma ? ',' : '') +
        (void 0 === this.precision
          ? ''
          : '.' + Math.max(0, 0 | this.precision)) +
        (this.trim ? '~' : '') +
        this.type
      );
    });
  var _ = {
    '%': function (t, n) {
      return (100 * t).toFixed(n);
    },
    b: function (t) {
      return Math.round(t).toString(2);
    },
    c: function (t) {
      return t + '';
    },
    d: n,
    e: function (t, n) {
      return t.toExponential(n);
    },
    f: function (t, n) {
      return t.toFixed(n);
    },
    g: function (t, n) {
      return t.toPrecision(n);
    },
    o: function (t) {
      return Math.round(t).toString(8);
    },
    p: function (t, n) {
      return f(100 * t, n);
    },
    r: f,
    s: l,
    X: function (t) {
      return Math.round(t).toString(16).toUpperCase();
    },
    x: function (t) {
      return Math.round(t).toString(16);
    },
  };
  function p(t) {
    return t;
  }
  var y,
    g = Array.prototype.map,
    d = [
      'y',
      'z',
      'a',
      'f',
      'p',
      'n',
      'µ',
      'm',
      '',
      'k',
      'M',
      'G',
      'T',
      'P',
      'E',
      'Z',
      'Y',
    ];
  function m(t) {
    var n =
        void 0 === t.grouping || void 0 === t.thousands
          ? p
          : r(g.call(t.grouping, Number), t.thousands + ''),
      e = void 0 === t.currency ? '' : t.currency[0] + '',
      u = void 0 === t.currency ? '' : t.currency[1] + '',
      c = void 0 === t.decimal ? '.' : t.decimal + '',
      l = void 0 === t.numerals ? p : o(g.call(t.numerals, String)),
      f = void 0 === t.percent ? '%' : t.percent + '',
      y = void 0 === t.minus ? '-' : t.minus + '',
      m = void 0 === t.nan ? 'NaN' : t.nan + '';
    function v(t) {
      var i = (t = s(t)).fill,
        r = t.align,
        o = t.sign,
        p = t.symbol,
        g = t.zero,
        v = t.width,
        x = t.comma,
        w = t.precision,
        M = t.trim,
        b = t.type;
      'n' === b
        ? ((x = !0), (b = 'g'))
        : _[b] || (void 0 === w && (w = 12), (M = !0), (b = 'g')),
        (g || ('0' === i && '=' === r)) && ((g = !0), (i = '0'), (r = '='));
      var T =
          '$' === p
            ? e
            : '#' === p && /[boxX]/.test(b)
            ? '0' + b.toLowerCase()
            : '',
        k = '$' === p ? u : /[%p]/.test(b) ? f : '',
        S = _[b],
        N = /[defgprs%]/.test(b);
      function C(t) {
        var e,
          u,
          s,
          f = T,
          _ = k;
        if ('c' === b) (_ = S(t) + _), (t = '');
        else {
          var p = (t = +t) < 0 || 1 / t < 0;
          if (
            ((t = isNaN(t) ? m : S(Math.abs(t), w)),
            M && (t = h(t)),
            p && 0 == +t && '+' !== o && (p = !1),
            (f =
              (p ? ('(' === o ? o : y) : '-' === o || '(' === o ? '' : o) + f),
            (_ =
              ('s' === b ? d[8 + a / 3] : '') +
              _ +
              (p && '(' === o ? ')' : '')),
            N)
          )
            for (e = -1, u = t.length; ++e < u; )
              if (48 > (s = t.charCodeAt(e)) || s > 57) {
                (_ = (46 === s ? c + t.slice(e + 1) : t.slice(e)) + _),
                  (t = t.slice(0, e));
                break;
              }
        }
        x && !g && (t = n(t, 1 / 0));
        var C = f.length + t.length + _.length,
          D = C < v ? new Array(v - C + 1).join(i) : '';
        switch (
          (x &&
            g &&
            ((t = n(D + t, D.length ? v - _.length : 1 / 0)), (D = '')),
          r)
        ) {
          case '<':
            t = f + t + _ + D;
            break;
          case '=':
            t = f + D + t + _;
            break;
          case '^':
            t = D.slice(0, (C = D.length >> 1)) + f + t + _ + D.slice(C);
            break;
          default:
            t = D + f + t + _;
        }
        return l(t);
      }
      return (
        (w =
          void 0 === w
            ? 6
            : /[gprs]/.test(b)
            ? Math.max(1, Math.min(21, w))
            : Math.max(0, Math.min(20, w))),
        (C.toString = function () {
          return t + '';
        }),
        C
      );
    }
    function x(t, n) {
      var e = v((((t = s(t)).type = 'f'), t)),
        r = 3 * Math.max(-8, Math.min(8, Math.floor(i(n) / 3))),
        o = Math.pow(10, -r),
        a = d[8 + r / 3];
      return function (t) {
        return e(o * t) + a;
      };
    }
    return { format: v, formatPrefix: x };
  }
  function v(n) {
    return (
      (y = m(n)), (t.format = y.format), (t.formatPrefix = y.formatPrefix), y
    );
  }
  function x(t) {
    return Math.max(0, -i(Math.abs(t)));
  }
  function w(t, n) {
    return Math.max(
      0,
      3 * Math.max(-8, Math.min(8, Math.floor(i(n) / 3))) - i(Math.abs(t))
    );
  }
  function M(t, n) {
    return (
      (t = Math.abs(t)), (n = Math.abs(n) - t), Math.max(0, i(n) - i(t)) + 1
    );
  }
  v({
    decimal: '.',
    thousands: ',',
    grouping: [3],
    currency: ['$', ''],
    minus: '-',
  }),
    (t.FormatSpecifier = c),
    (t.formatDefaultLocale = v),
    (t.formatLocale = m),
    (t.formatSpecifier = s),
    (t.precisionFixed = x),
    (t.precisionPrefix = w),
    (t.precisionRound = M),
    Object.defineProperty(t, '__esModule', { value: !0 });
})(Xt.exports);
var Zt = new Date(),
  $t = new Date();
function Gt(t, n, e, i) {
  function r(n) {
    return t((n = 0 === arguments.length ? new Date() : new Date(+n))), n;
  }
  return (
    (r.floor = function (n) {
      return t((n = new Date(+n))), n;
    }),
    (r.ceil = function (e) {
      return t((e = new Date(e - 1))), n(e, 1), t(e), e;
    }),
    (r.round = function (t) {
      var n = r(t),
        e = r.ceil(t);
      return t - n < e - t ? n : e;
    }),
    (r.offset = function (t, e) {
      return n((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t;
    }),
    (r.range = function (e, i, o) {
      var a,
        u = [];
      if (
        ((e = r.ceil(e)),
        (o = null == o ? 1 : Math.floor(o)),
        !(e < i && o > 0))
      )
        return u;
      do {
        u.push((a = new Date(+e))), n(e, o), t(e);
      } while (a < e && e < i);
      return u;
    }),
    (r.filter = function (e) {
      return Gt(
        function (n) {
          if (n >= n) for (; t(n), !e(n); ) n.setTime(n - 1);
        },
        function (t, i) {
          if (t >= t)
            if (i < 0) for (; ++i <= 0; ) for (; n(t, -1), !e(t); );
            else for (; --i >= 0; ) for (; n(t, 1), !e(t); );
        }
      );
    }),
    e &&
      ((r.count = function (n, i) {
        return (
          Zt.setTime(+n), $t.setTime(+i), t(Zt), t($t), Math.floor(e(Zt, $t))
        );
      }),
      (r.every = function (t) {
        return (
          (t = Math.floor(t)),
          isFinite(t) && t > 0
            ? t > 1
              ? r.filter(
                  i
                    ? function (n) {
                        return i(n) % t == 0;
                      }
                    : function (n) {
                        return r.count(0, n) % t == 0;
                      }
                )
              : r
            : null
        );
      })),
    r
  );
}
var Qt = Gt(
  function () {},
  function (t, n) {
    t.setTime(+t + n);
  },
  function (t, n) {
    return n - t;
  }
);
Qt.every = function (t) {
  return (
    (t = Math.floor(t)),
    isFinite(t) && t > 0
      ? t > 1
        ? Gt(
            function (n) {
              n.setTime(Math.floor(n / t) * t);
            },
            function (n, e) {
              n.setTime(+n + e * t);
            },
            function (n, e) {
              return (e - n) / t;
            }
          )
        : Qt
      : null
  );
};
var Jt = Qt.range,
  Kt = Gt(
    function (t) {
      t.setTime(t - t.getMilliseconds());
    },
    function (t, n) {
      t.setTime(+t + 1e3 * n);
    },
    function (t, n) {
      return (n - t) / 1e3;
    },
    function (t) {
      return t.getUTCSeconds();
    }
  ),
  tn = Kt.range,
  nn = Gt(
    function (t) {
      t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds());
    },
    function (t, n) {
      t.setTime(+t + 6e4 * n);
    },
    function (t, n) {
      return (n - t) / 6e4;
    },
    function (t) {
      return t.getMinutes();
    }
  ),
  en = nn.range,
  rn = Gt(
    function (t) {
      t.setTime(
        t - t.getMilliseconds() - 1e3 * t.getSeconds() - 6e4 * t.getMinutes()
      );
    },
    function (t, n) {
      t.setTime(+t + 36e5 * n);
    },
    function (t, n) {
      return (n - t) / 36e5;
    },
    function (t) {
      return t.getHours();
    }
  ),
  on = rn.range,
  an = Gt(
    function (t) {
      t.setHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setDate(t.getDate() + n);
    },
    function (t, n) {
      return (
        (n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5
      );
    },
    function (t) {
      return t.getDate() - 1;
    }
  ),
  un = an.range;
function sn(t) {
  return Gt(
    function (n) {
      n.setDate(n.getDate() - ((n.getDay() + 7 - t) % 7)),
        n.setHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setDate(t.getDate() + 7 * n);
    },
    function (t, n) {
      return (
        (n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 6048e5
      );
    }
  );
}
var cn = sn(0),
  hn = sn(1),
  ln = sn(2),
  fn = sn(3),
  _n = sn(4),
  pn = sn(5),
  yn = sn(6),
  gn = cn.range,
  dn = hn.range,
  mn = ln.range,
  vn = fn.range,
  xn = _n.range,
  wn = pn.range,
  Mn = yn.range,
  bn = Gt(
    function (t) {
      t.setDate(1), t.setHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setMonth(t.getMonth() + n);
    },
    function (t, n) {
      return (
        n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
      );
    },
    function (t) {
      return t.getMonth();
    }
  ),
  Tn = bn.range,
  kn = Gt(
    function (t) {
      t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setFullYear(t.getFullYear() + n);
    },
    function (t, n) {
      return n.getFullYear() - t.getFullYear();
    },
    function (t) {
      return t.getFullYear();
    }
  );
kn.every = function (t) {
  return isFinite((t = Math.floor(t))) && t > 0
    ? Gt(
        function (n) {
          n.setFullYear(Math.floor(n.getFullYear() / t) * t),
            n.setMonth(0, 1),
            n.setHours(0, 0, 0, 0);
        },
        function (n, e) {
          n.setFullYear(n.getFullYear() + e * t);
        }
      )
    : null;
};
var Sn = kn.range,
  Nn = Gt(
    function (t) {
      t.setUTCSeconds(0, 0);
    },
    function (t, n) {
      t.setTime(+t + 6e4 * n);
    },
    function (t, n) {
      return (n - t) / 6e4;
    },
    function (t) {
      return t.getUTCMinutes();
    }
  ),
  Cn = Nn.range,
  Dn = Gt(
    function (t) {
      t.setUTCMinutes(0, 0, 0);
    },
    function (t, n) {
      t.setTime(+t + 36e5 * n);
    },
    function (t, n) {
      return (n - t) / 36e5;
    },
    function (t) {
      return t.getUTCHours();
    }
  ),
  An = Dn.range,
  Un = Gt(
    function (t) {
      t.setUTCHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setUTCDate(t.getUTCDate() + n);
    },
    function (t, n) {
      return (n - t) / 864e5;
    },
    function (t) {
      return t.getUTCDate() - 1;
    }
  ),
  En = Un.range;
function Pn(t) {
  return Gt(
    function (n) {
      n.setUTCDate(n.getUTCDate() - ((n.getUTCDay() + 7 - t) % 7)),
        n.setUTCHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setUTCDate(t.getUTCDate() + 7 * n);
    },
    function (t, n) {
      return (n - t) / 6048e5;
    }
  );
}
var Fn = Pn(0),
  Yn = Pn(1),
  Hn = Pn(2),
  Ln = Pn(3),
  On = Pn(4),
  zn = Pn(5),
  jn = Pn(6),
  qn = Fn.range,
  In = Yn.range,
  Vn = Hn.range,
  Xn = Ln.range,
  Wn = On.range,
  Rn = zn.range,
  Bn = jn.range,
  Zn = Gt(
    function (t) {
      t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setUTCMonth(t.getUTCMonth() + n);
    },
    function (t, n) {
      return (
        n.getUTCMonth() -
        t.getUTCMonth() +
        12 * (n.getUTCFullYear() - t.getUTCFullYear())
      );
    },
    function (t) {
      return t.getUTCMonth();
    }
  ),
  $n = Zn.range,
  Gn = Gt(
    function (t) {
      t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
    },
    function (t, n) {
      t.setUTCFullYear(t.getUTCFullYear() + n);
    },
    function (t, n) {
      return n.getUTCFullYear() - t.getUTCFullYear();
    },
    function (t) {
      return t.getUTCFullYear();
    }
  );
Gn.every = function (t) {
  return isFinite((t = Math.floor(t))) && t > 0
    ? Gt(
        function (n) {
          n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
            n.setUTCMonth(0, 1),
            n.setUTCHours(0, 0, 0, 0);
        },
        function (n, e) {
          n.setUTCFullYear(n.getUTCFullYear() + e * t);
        }
      )
    : null;
};
var Qn = Gn.range,
  Jn = { exports: {} };
!(function (t, n) {
  function e(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
      return n.setFullYear(t.y), n;
    }
    return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
  }
  function i(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
      return n.setUTCFullYear(t.y), n;
    }
    return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
  }
  function r(t, n, e) {
    return { y: t, m: n, d: e, H: 0, M: 0, S: 0, L: 0 };
  }
  function o(t) {
    var o = t.dateTime,
      a = t.date,
      s = t.time,
      c = t.periods,
      h = t.days,
      l = t.shortDays,
      f = t.months,
      R = t.shortMonths,
      ft = _(c),
      Tt = p(c),
      kt = _(h),
      St = p(h),
      Nt = _(l),
      Ct = p(l),
      Dt = _(f),
      At = p(f),
      Ut = _(R),
      Et = p(R),
      Pt = {
        a: Bt,
        A: Zt,
        b: $t,
        B: Gt,
        c: null,
        d: Y,
        e: Y,
        f: j,
        g: Q,
        G: K,
        H: H,
        I: L,
        j: O,
        L: z,
        m: q,
        M: I,
        p: Qt,
        q: Jt,
        Q: Mt,
        s: bt,
        S: V,
        u: X,
        U: W,
        V: B,
        w: Z,
        W: $,
        x: null,
        X: null,
        y: G,
        Y: J,
        Z: tt,
        '%': wt,
      },
      Ft = {
        a: Kt,
        A: tn,
        b: nn,
        B: en,
        c: null,
        d: nt,
        e: nt,
        f: at,
        g: dt,
        G: vt,
        H: et,
        I: it,
        j: rt,
        L: ot,
        m: ut,
        M: st,
        p: rn,
        q: on,
        Q: Mt,
        s: bt,
        S: ct,
        u: ht,
        U: lt,
        V: _t,
        w: pt,
        W: yt,
        x: null,
        X: null,
        y: gt,
        Y: mt,
        Z: xt,
        '%': wt,
      },
      Yt = {
        a: jt,
        A: qt,
        b: It,
        B: Vt,
        c: Xt,
        d: k,
        e: k,
        f: U,
        g: w,
        G: x,
        H: N,
        I: N,
        j: S,
        L: A,
        m: T,
        M: C,
        p: zt,
        q: b,
        Q: P,
        s: F,
        S: D,
        u: g,
        U: d,
        V: m,
        w: y,
        W: v,
        x: Wt,
        X: Rt,
        y: w,
        Y: x,
        Z: M,
        '%': E,
      };
    function Ht(t, n) {
      return function (e) {
        var i,
          r,
          o,
          a = [],
          s = -1,
          c = 0,
          h = t.length;
        for (e instanceof Date || (e = new Date(+e)); ++s < h; )
          37 === t.charCodeAt(s) &&
            (a.push(t.slice(c, s)),
            null != (r = u[(i = t.charAt(++s))])
              ? (i = t.charAt(++s))
              : (r = 'e' === i ? ' ' : '0'),
            (o = n[i]) && (i = o(e, r)),
            a.push(i),
            (c = s + 1));
        return a.push(t.slice(c, s)), a.join('');
      };
    }
    function Lt(t, o) {
      return function (a) {
        var u,
          s,
          c = r(1900, void 0, 1);
        if (Ot(c, t, (a += ''), 0) != a.length) return null;
        if ('Q' in c) return new Date(c.Q);
        if ('s' in c) return new Date(1e3 * c.s + ('L' in c ? c.L : 0));
        if (
          (o && !('Z' in c) && (c.Z = 0),
          'p' in c && (c.H = (c.H % 12) + 12 * c.p),
          void 0 === c.m && (c.m = 'q' in c ? c.q : 0),
          'V' in c)
        ) {
          if (c.V < 1 || c.V > 53) return null;
          'w' in c || (c.w = 1),
            'Z' in c
              ? ((s = (u = i(r(c.y, 0, 1))).getUTCDay()),
                (u = s > 4 || 0 === s ? n.utcMonday.ceil(u) : n.utcMonday(u)),
                (u = n.utcDay.offset(u, 7 * (c.V - 1))),
                (c.y = u.getUTCFullYear()),
                (c.m = u.getUTCMonth()),
                (c.d = u.getUTCDate() + ((c.w + 6) % 7)))
              : ((s = (u = e(r(c.y, 0, 1))).getDay()),
                (u = s > 4 || 0 === s ? n.timeMonday.ceil(u) : n.timeMonday(u)),
                (u = n.timeDay.offset(u, 7 * (c.V - 1))),
                (c.y = u.getFullYear()),
                (c.m = u.getMonth()),
                (c.d = u.getDate() + ((c.w + 6) % 7)));
        } else
          ('W' in c || 'U' in c) &&
            ('w' in c || (c.w = 'u' in c ? c.u % 7 : 'W' in c ? 1 : 0),
            (s =
              'Z' in c
                ? i(r(c.y, 0, 1)).getUTCDay()
                : e(r(c.y, 0, 1)).getDay()),
            (c.m = 0),
            (c.d =
              'W' in c
                ? ((c.w + 6) % 7) + 7 * c.W - ((s + 5) % 7)
                : c.w + 7 * c.U - ((s + 6) % 7)));
        return 'Z' in c
          ? ((c.H += (c.Z / 100) | 0), (c.M += c.Z % 100), i(c))
          : e(c);
      };
    }
    function Ot(t, n, e, i) {
      for (var r, o, a = 0, s = n.length, c = e.length; a < s; ) {
        if (i >= c) return -1;
        if (37 === (r = n.charCodeAt(a++))) {
          if (
            ((r = n.charAt(a++)),
            !(o = Yt[r in u ? n.charAt(a++) : r]) || (i = o(t, e, i)) < 0)
          )
            return -1;
        } else if (r != e.charCodeAt(i++)) return -1;
      }
      return i;
    }
    function zt(t, n, e) {
      var i = ft.exec(n.slice(e));
      return i ? ((t.p = Tt[i[0].toLowerCase()]), e + i[0].length) : -1;
    }
    function jt(t, n, e) {
      var i = Nt.exec(n.slice(e));
      return i ? ((t.w = Ct[i[0].toLowerCase()]), e + i[0].length) : -1;
    }
    function qt(t, n, e) {
      var i = kt.exec(n.slice(e));
      return i ? ((t.w = St[i[0].toLowerCase()]), e + i[0].length) : -1;
    }
    function It(t, n, e) {
      var i = Ut.exec(n.slice(e));
      return i ? ((t.m = Et[i[0].toLowerCase()]), e + i[0].length) : -1;
    }
    function Vt(t, n, e) {
      var i = Dt.exec(n.slice(e));
      return i ? ((t.m = At[i[0].toLowerCase()]), e + i[0].length) : -1;
    }
    function Xt(t, n, e) {
      return Ot(t, o, n, e);
    }
    function Wt(t, n, e) {
      return Ot(t, a, n, e);
    }
    function Rt(t, n, e) {
      return Ot(t, s, n, e);
    }
    function Bt(t) {
      return l[t.getDay()];
    }
    function Zt(t) {
      return h[t.getDay()];
    }
    function $t(t) {
      return R[t.getMonth()];
    }
    function Gt(t) {
      return f[t.getMonth()];
    }
    function Qt(t) {
      return c[+(t.getHours() >= 12)];
    }
    function Jt(t) {
      return 1 + ~~(t.getMonth() / 3);
    }
    function Kt(t) {
      return l[t.getUTCDay()];
    }
    function tn(t) {
      return h[t.getUTCDay()];
    }
    function nn(t) {
      return R[t.getUTCMonth()];
    }
    function en(t) {
      return f[t.getUTCMonth()];
    }
    function rn(t) {
      return c[+(t.getUTCHours() >= 12)];
    }
    function on(t) {
      return 1 + ~~(t.getUTCMonth() / 3);
    }
    return (
      (Pt.x = Ht(a, Pt)),
      (Pt.X = Ht(s, Pt)),
      (Pt.c = Ht(o, Pt)),
      (Ft.x = Ht(a, Ft)),
      (Ft.X = Ht(s, Ft)),
      (Ft.c = Ht(o, Ft)),
      {
        format: function (t) {
          var n = Ht((t += ''), Pt);
          return (
            (n.toString = function () {
              return t;
            }),
            n
          );
        },
        parse: function (t) {
          var n = Lt((t += ''), !1);
          return (
            (n.toString = function () {
              return t;
            }),
            n
          );
        },
        utcFormat: function (t) {
          var n = Ht((t += ''), Ft);
          return (
            (n.toString = function () {
              return t;
            }),
            n
          );
        },
        utcParse: function (t) {
          var n = Lt((t += ''), !0);
          return (
            (n.toString = function () {
              return t;
            }),
            n
          );
        },
      }
    );
  }
  var a,
    u = { '-': '', _: ' ', 0: '0' },
    s = /^\s*\d+/,
    c = /^%/,
    h = /[\\^$*+?|[\]().{}]/g;
  function l(t, n, e) {
    var i = t < 0 ? '-' : '',
      r = (i ? -t : t) + '',
      o = r.length;
    return i + (o < e ? new Array(e - o + 1).join(n) + r : r);
  }
  function f(t) {
    return t.replace(h, '\\$&');
  }
  function _(t) {
    return new RegExp('^(?:' + t.map(f).join('|') + ')', 'i');
  }
  function p(t) {
    for (var n = {}, e = -1, i = t.length; ++e < i; ) n[t[e].toLowerCase()] = e;
    return n;
  }
  function y(t, n, e) {
    var i = s.exec(n.slice(e, e + 1));
    return i ? ((t.w = +i[0]), e + i[0].length) : -1;
  }
  function g(t, n, e) {
    var i = s.exec(n.slice(e, e + 1));
    return i ? ((t.u = +i[0]), e + i[0].length) : -1;
  }
  function d(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.U = +i[0]), e + i[0].length) : -1;
  }
  function m(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.V = +i[0]), e + i[0].length) : -1;
  }
  function v(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.W = +i[0]), e + i[0].length) : -1;
  }
  function x(t, n, e) {
    var i = s.exec(n.slice(e, e + 4));
    return i ? ((t.y = +i[0]), e + i[0].length) : -1;
  }
  function w(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i
      ? ((t.y = +i[0] + (+i[0] > 68 ? 1900 : 2e3)), e + i[0].length)
      : -1;
  }
  function M(t, n, e) {
    var i = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
    return i
      ? ((t.Z = i[1] ? 0 : -(i[2] + (i[3] || '00'))), e + i[0].length)
      : -1;
  }
  function b(t, n, e) {
    var i = s.exec(n.slice(e, e + 1));
    return i ? ((t.q = 3 * i[0] - 3), e + i[0].length) : -1;
  }
  function T(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.m = i[0] - 1), e + i[0].length) : -1;
  }
  function k(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.d = +i[0]), e + i[0].length) : -1;
  }
  function S(t, n, e) {
    var i = s.exec(n.slice(e, e + 3));
    return i ? ((t.m = 0), (t.d = +i[0]), e + i[0].length) : -1;
  }
  function N(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.H = +i[0]), e + i[0].length) : -1;
  }
  function C(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.M = +i[0]), e + i[0].length) : -1;
  }
  function D(t, n, e) {
    var i = s.exec(n.slice(e, e + 2));
    return i ? ((t.S = +i[0]), e + i[0].length) : -1;
  }
  function A(t, n, e) {
    var i = s.exec(n.slice(e, e + 3));
    return i ? ((t.L = +i[0]), e + i[0].length) : -1;
  }
  function U(t, n, e) {
    var i = s.exec(n.slice(e, e + 6));
    return i ? ((t.L = Math.floor(i[0] / 1e3)), e + i[0].length) : -1;
  }
  function E(t, n, e) {
    var i = c.exec(n.slice(e, e + 1));
    return i ? e + i[0].length : -1;
  }
  function P(t, n, e) {
    var i = s.exec(n.slice(e));
    return i ? ((t.Q = +i[0]), e + i[0].length) : -1;
  }
  function F(t, n, e) {
    var i = s.exec(n.slice(e));
    return i ? ((t.s = +i[0]), e + i[0].length) : -1;
  }
  function Y(t, n) {
    return l(t.getDate(), n, 2);
  }
  function H(t, n) {
    return l(t.getHours(), n, 2);
  }
  function L(t, n) {
    return l(t.getHours() % 12 || 12, n, 2);
  }
  function O(t, e) {
    return l(1 + n.timeDay.count(n.timeYear(t), t), e, 3);
  }
  function z(t, n) {
    return l(t.getMilliseconds(), n, 3);
  }
  function j(t, n) {
    return z(t, n) + '000';
  }
  function q(t, n) {
    return l(t.getMonth() + 1, n, 2);
  }
  function I(t, n) {
    return l(t.getMinutes(), n, 2);
  }
  function V(t, n) {
    return l(t.getSeconds(), n, 2);
  }
  function X(t) {
    var n = t.getDay();
    return 0 === n ? 7 : n;
  }
  function W(t, e) {
    return l(n.timeSunday.count(n.timeYear(t) - 1, t), e, 2);
  }
  function R(t) {
    var e = t.getDay();
    return e >= 4 || 0 === e ? n.timeThursday(t) : n.timeThursday.ceil(t);
  }
  function B(t, e) {
    return (
      (t = R(t)),
      l(
        n.timeThursday.count(n.timeYear(t), t) + (4 === n.timeYear(t).getDay()),
        e,
        2
      )
    );
  }
  function Z(t) {
    return t.getDay();
  }
  function $(t, e) {
    return l(n.timeMonday.count(n.timeYear(t) - 1, t), e, 2);
  }
  function G(t, n) {
    return l(t.getFullYear() % 100, n, 2);
  }
  function Q(t, n) {
    return l((t = R(t)).getFullYear() % 100, n, 2);
  }
  function J(t, n) {
    return l(t.getFullYear() % 1e4, n, 4);
  }
  function K(t, e) {
    var i = t.getDay();
    return l(
      (t =
        i >= 4 || 0 === i
          ? n.timeThursday(t)
          : n.timeThursday.ceil(t)).getFullYear() % 1e4,
      e,
      4
    );
  }
  function tt(t) {
    var n = t.getTimezoneOffset();
    return (
      (n > 0 ? '-' : ((n *= -1), '+')) +
      l((n / 60) | 0, '0', 2) +
      l(n % 60, '0', 2)
    );
  }
  function nt(t, n) {
    return l(t.getUTCDate(), n, 2);
  }
  function et(t, n) {
    return l(t.getUTCHours(), n, 2);
  }
  function it(t, n) {
    return l(t.getUTCHours() % 12 || 12, n, 2);
  }
  function rt(t, e) {
    return l(1 + n.utcDay.count(n.utcYear(t), t), e, 3);
  }
  function ot(t, n) {
    return l(t.getUTCMilliseconds(), n, 3);
  }
  function at(t, n) {
    return ot(t, n) + '000';
  }
  function ut(t, n) {
    return l(t.getUTCMonth() + 1, n, 2);
  }
  function st(t, n) {
    return l(t.getUTCMinutes(), n, 2);
  }
  function ct(t, n) {
    return l(t.getUTCSeconds(), n, 2);
  }
  function ht(t) {
    var n = t.getUTCDay();
    return 0 === n ? 7 : n;
  }
  function lt(t, e) {
    return l(n.utcSunday.count(n.utcYear(t) - 1, t), e, 2);
  }
  function ft(t) {
    var e = t.getUTCDay();
    return e >= 4 || 0 === e ? n.utcThursday(t) : n.utcThursday.ceil(t);
  }
  function _t(t, e) {
    return (
      (t = ft(t)),
      l(
        n.utcThursday.count(n.utcYear(t), t) + (4 === n.utcYear(t).getUTCDay()),
        e,
        2
      )
    );
  }
  function pt(t) {
    return t.getUTCDay();
  }
  function yt(t, e) {
    return l(n.utcMonday.count(n.utcYear(t) - 1, t), e, 2);
  }
  function gt(t, n) {
    return l(t.getUTCFullYear() % 100, n, 2);
  }
  function dt(t, n) {
    return l((t = ft(t)).getUTCFullYear() % 100, n, 2);
  }
  function mt(t, n) {
    return l(t.getUTCFullYear() % 1e4, n, 4);
  }
  function vt(t, e) {
    var i = t.getUTCDay();
    return l(
      (t =
        i >= 4 || 0 === i
          ? n.utcThursday(t)
          : n.utcThursday.ceil(t)).getUTCFullYear() % 1e4,
      e,
      4
    );
  }
  function xt() {
    return '+0000';
  }
  function wt() {
    return '%';
  }
  function Mt(t) {
    return +t;
  }
  function bt(t) {
    return Math.floor(+t / 1e3);
  }
  function Tt(n) {
    return (
      (a = o(n)),
      (t.timeFormat = a.format),
      (t.timeParse = a.parse),
      (t.utcFormat = a.utcFormat),
      (t.utcParse = a.utcParse),
      a
    );
  }
  Tt({
    dateTime: '%x, %X',
    date: '%-m/%-d/%Y',
    time: '%-I:%M:%S %p',
    periods: ['AM', 'PM'],
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  });
  var kt = '%Y-%m-%dT%H:%M:%S.%LZ';
  function St(t) {
    return t.toISOString();
  }
  var Nt = Date.prototype.toISOString ? St : t.utcFormat(kt);
  function Ct(t) {
    var n = new Date(t);
    return isNaN(n) ? null : n;
  }
  var Dt = +new Date('2000-01-01T00:00:00.000Z') ? Ct : t.utcParse(kt);
  (t.isoFormat = Nt),
    (t.isoParse = Dt),
    (t.timeFormatDefaultLocale = Tt),
    (t.timeFormatLocale = o),
    Object.defineProperty(t, '__esModule', { value: !0 });
})(
  Jn.exports,
  e(
    Object.freeze({
      __proto__: null,
      timeInterval: Gt,
      timeMillisecond: Qt,
      timeMilliseconds: Jt,
      utcMillisecond: Qt,
      utcMilliseconds: Jt,
      timeSecond: Kt,
      timeSeconds: tn,
      utcSecond: Kt,
      utcSeconds: tn,
      timeMinute: nn,
      timeMinutes: en,
      timeHour: rn,
      timeHours: on,
      timeDay: an,
      timeDays: un,
      timeWeek: cn,
      timeWeeks: gn,
      timeSunday: cn,
      timeSundays: gn,
      timeMonday: hn,
      timeMondays: dn,
      timeTuesday: ln,
      timeTuesdays: mn,
      timeWednesday: fn,
      timeWednesdays: vn,
      timeThursday: _n,
      timeThursdays: xn,
      timeFriday: pn,
      timeFridays: wn,
      timeSaturday: yn,
      timeSaturdays: Mn,
      timeMonth: bn,
      timeMonths: Tn,
      timeYear: kn,
      timeYears: Sn,
      utcMinute: Nn,
      utcMinutes: Cn,
      utcHour: Dn,
      utcHours: An,
      utcDay: Un,
      utcDays: En,
      utcWeek: Fn,
      utcWeeks: qn,
      utcSunday: Fn,
      utcSundays: qn,
      utcMonday: Yn,
      utcMondays: In,
      utcTuesday: Hn,
      utcTuesdays: Vn,
      utcWednesday: Ln,
      utcWednesdays: Xn,
      utcThursday: On,
      utcThursdays: Wn,
      utcFriday: zn,
      utcFridays: Rn,
      utcSaturday: jn,
      utcSaturdays: Bn,
      utcMonth: Zn,
      utcMonths: $n,
      utcYear: Gn,
      utcYears: Qn,
    })
  )
);
var Kn = Array.prototype.slice;
function te(t) {
  return t;
}
function ne(t) {
  return 'translate(' + (t + 0.5) + ',0)';
}
function ee(t) {
  return 'translate(0,' + (t + 0.5) + ')';
}
function ie(t) {
  return function (n) {
    return +t(n);
  };
}
function re(t) {
  var n = Math.max(0, t.bandwidth() - 1) / 2;
  return (
    t.round() && (n = Math.round(n)),
    function (e) {
      return +t(e) + n;
    }
  );
}
function oe() {
  return !this.__axis;
}
function ae(t, n) {
  var e = [],
    i = null,
    r = null,
    o = 6,
    a = 6,
    u = 3,
    s = 1 === t || 4 === t ? -1 : 1,
    c = 4 === t || 2 === t ? 'x' : 'y',
    h = 1 === t || 3 === t ? ne : ee;
  function l(l) {
    var f = null == i ? (n.ticks ? n.ticks.apply(n, e) : n.domain()) : i,
      _ = null == r ? (n.tickFormat ? n.tickFormat.apply(n, e) : te) : r,
      p = Math.max(o, 0) + u,
      y = n.range(),
      g = +y[0] + 0.5,
      d = +y[y.length - 1] + 0.5,
      m = (n.bandwidth ? re : ie)(n.copy()),
      v = l.selection ? l.selection() : l,
      x = v.selectAll('.domain').data([null]),
      w = v.selectAll('.tick').data(f, n).order(),
      M = w.exit(),
      b = w.enter().append('g').attr('class', 'tick'),
      T = w.select('line'),
      k = w.select('text');
    (x = x.merge(
      x
        .enter()
        .insert('path', '.tick')
        .attr('class', 'domain')
        .attr('stroke', 'currentColor')
    )),
      (w = w.merge(b)),
      (T = T.merge(
        b
          .append('line')
          .attr('stroke', 'currentColor')
          .attr(c + '2', s * o)
      )),
      (k = k.merge(
        b
          .append('text')
          .attr('fill', 'currentColor')
          .attr(c, s * p)
          .attr('dy', 1 === t ? '0em' : 3 === t ? '0.71em' : '0.32em')
      )),
      l !== v &&
        ((x = x.transition(l)),
        (w = w.transition(l)),
        (T = T.transition(l)),
        (k = k.transition(l)),
        (M = M.transition(l)
          .attr('opacity', 1e-6)
          .attr('transform', function (t) {
            return isFinite((t = m(t))) ? h(t) : this.getAttribute('transform');
          })),
        b.attr('opacity', 1e-6).attr('transform', function (t) {
          var n = this.parentNode.__axis;
          return h(n && isFinite((n = n(t))) ? n : m(t));
        })),
      M.remove(),
      x.attr(
        'd',
        4 === t || 2 == t
          ? a
            ? 'M' + s * a + ',' + g + 'H0.5V' + d + 'H' + s * a
            : 'M0.5,' + g + 'V' + d
          : a
          ? 'M' + g + ',' + s * a + 'V0.5H' + d + 'V' + s * a
          : 'M' + g + ',0.5H' + d
      ),
      w.attr('opacity', 1).attr('transform', function (t) {
        return h(m(t));
      }),
      T.attr(c + '2', s * o),
      k.attr(c, s * p).text(_),
      v
        .filter(oe)
        .attr('fill', 'none')
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 2 === t ? 'start' : 4 === t ? 'end' : 'middle'),
      v.each(function () {
        this.__axis = m;
      });
  }
  return (
    (l.scale = function (t) {
      return arguments.length ? ((n = t), l) : n;
    }),
    (l.ticks = function () {
      return (e = Kn.call(arguments)), l;
    }),
    (l.tickArguments = function (t) {
      return arguments.length
        ? ((e = null == t ? [] : Kn.call(t)), l)
        : e.slice();
    }),
    (l.tickValues = function (t) {
      return arguments.length
        ? ((i = null == t ? null : Kn.call(t)), l)
        : i && i.slice();
    }),
    (l.tickFormat = function (t) {
      return arguments.length ? ((r = t), l) : r;
    }),
    (l.tickSize = function (t) {
      return arguments.length ? ((o = a = +t), l) : o;
    }),
    (l.tickSizeInner = function (t) {
      return arguments.length ? ((o = +t), l) : o;
    }),
    (l.tickSizeOuter = function (t) {
      return arguments.length ? ((a = +t), l) : a;
    }),
    (l.tickPadding = function (t) {
      return arguments.length ? ((u = +t), l) : u;
    }),
    l
  );
}
function ue(t) {
  return ae(3, t);
}
var se = Math.PI,
  ce = 2 * se,
  he = ce - 1e-6;
function le() {
  (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = '');
}
function fe() {
  return new le();
}
function _e(t) {
  return function () {
    return t;
  };
}
le.prototype = fe.prototype = {
  constructor: le,
  moveTo: function (t, n) {
    this._ +=
      'M' + (this._x0 = this._x1 = +t) + ',' + (this._y0 = this._y1 = +n);
  },
  closePath: function () {
    null !== this._x1 &&
      ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += 'Z'));
  },
  lineTo: function (t, n) {
    this._ += 'L' + (this._x1 = +t) + ',' + (this._y1 = +n);
  },
  quadraticCurveTo: function (t, n, e, i) {
    this._ +=
      'Q' + +t + ',' + +n + ',' + (this._x1 = +e) + ',' + (this._y1 = +i);
  },
  bezierCurveTo: function (t, n, e, i, r, o) {
    this._ +=
      'C' +
      +t +
      ',' +
      +n +
      ',' +
      +e +
      ',' +
      +i +
      ',' +
      (this._x1 = +r) +
      ',' +
      (this._y1 = +o);
  },
  arcTo: function (t, n, e, i, r) {
    (t = +t), (n = +n), (e = +e), (i = +i), (r = +r);
    var o = this._x1,
      a = this._y1,
      u = e - t,
      s = i - n,
      c = o - t,
      h = a - n,
      l = c * c + h * h;
    if (r < 0) throw new Error('negative radius: ' + r);
    if (null === this._x1)
      this._ += 'M' + (this._x1 = t) + ',' + (this._y1 = n);
    else if (l > 1e-6)
      if (Math.abs(h * u - s * c) > 1e-6 && r) {
        var f = e - o,
          _ = i - a,
          p = u * u + s * s,
          y = f * f + _ * _,
          g = Math.sqrt(p),
          d = Math.sqrt(l),
          m = r * Math.tan((se - Math.acos((p + l - y) / (2 * g * d))) / 2),
          v = m / d,
          x = m / g;
        Math.abs(v - 1) > 1e-6 &&
          (this._ += 'L' + (t + v * c) + ',' + (n + v * h)),
          (this._ +=
            'A' +
            r +
            ',' +
            r +
            ',0,0,' +
            +(h * f > c * _) +
            ',' +
            (this._x1 = t + x * u) +
            ',' +
            (this._y1 = n + x * s));
      } else this._ += 'L' + (this._x1 = t) + ',' + (this._y1 = n);
    else;
  },
  arc: function (t, n, e, i, r, o) {
    (t = +t), (n = +n), (o = !!o);
    var a = (e = +e) * Math.cos(i),
      u = e * Math.sin(i),
      s = t + a,
      c = n + u,
      h = 1 ^ o,
      l = o ? i - r : r - i;
    if (e < 0) throw new Error('negative radius: ' + e);
    null === this._x1
      ? (this._ += 'M' + s + ',' + c)
      : (Math.abs(this._x1 - s) > 1e-6 || Math.abs(this._y1 - c) > 1e-6) &&
        (this._ += 'L' + s + ',' + c),
      e &&
        (l < 0 && (l = (l % ce) + ce),
        l > he
          ? (this._ +=
              'A' +
              e +
              ',' +
              e +
              ',0,1,' +
              h +
              ',' +
              (t - a) +
              ',' +
              (n - u) +
              'A' +
              e +
              ',' +
              e +
              ',0,1,' +
              h +
              ',' +
              (this._x1 = s) +
              ',' +
              (this._y1 = c))
          : l > 1e-6 &&
            (this._ +=
              'A' +
              e +
              ',' +
              e +
              ',0,' +
              +(l >= se) +
              ',' +
              h +
              ',' +
              (this._x1 = t + e * Math.cos(r)) +
              ',' +
              (this._y1 = n + e * Math.sin(r))));
  },
  rect: function (t, n, e, i) {
    this._ +=
      'M' +
      (this._x0 = this._x1 = +t) +
      ',' +
      (this._y0 = this._y1 = +n) +
      'h' +
      +e +
      'v' +
      +i +
      'h' +
      -e +
      'Z';
  },
  toString: function () {
    return this._;
  },
};
function pe(t) {
  this._context = t;
}
function ye(t) {
  return new pe(t);
}
function ge(t) {
  return t[0];
}
function de(t) {
  return t[1];
}
function me() {
  var t = ge,
    n = de,
    e = _e(!0),
    i = null,
    r = ye,
    o = null;
  function a(a) {
    var u,
      s,
      c,
      h = a.length,
      l = !1;
    for (null == i && (o = r((c = fe()))), u = 0; u <= h; ++u)
      !(u < h && e((s = a[u]), u, a)) === l &&
        ((l = !l) ? o.lineStart() : o.lineEnd()),
        l && o.point(+t(s, u, a), +n(s, u, a));
    if (c) return (o = null), c + '' || null;
  }
  return (
    (a.x = function (n) {
      return arguments.length
        ? ((t = 'function' == typeof n ? n : _e(+n)), a)
        : t;
    }),
    (a.y = function (t) {
      return arguments.length
        ? ((n = 'function' == typeof t ? t : _e(+t)), a)
        : n;
    }),
    (a.defined = function (t) {
      return arguments.length
        ? ((e = 'function' == typeof t ? t : _e(!!t)), a)
        : e;
    }),
    (a.curve = function (t) {
      return arguments.length ? ((r = t), null != i && (o = r(i)), a) : r;
    }),
    (a.context = function (t) {
      return arguments.length
        ? (null == t ? (i = o = null) : (o = r((i = t))), a)
        : i;
    }),
    a
  );
}
function ve() {}
function xe(t, n, e) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + n) / 6,
    (t._y0 + 4 * t._y1 + e) / 6
  );
}
function we(t) {
  this._context = t;
}
function Me(t, n) {
  (this._basis = new we(t)), (this._beta = n);
}
function be(t, n, e) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - n),
    t._y2 + t._k * (t._y1 - e),
    t._x2,
    t._y2
  );
}
function Te(t, n) {
  (this._context = t), (this._k = (1 - n) / 6);
}
function ke(t, n) {
  (this._context = t), (this._k = (1 - n) / 6);
}
function Se(t, n) {
  (this._context = t), (this._k = (1 - n) / 6);
}
function Ne(t, n, e) {
  var i = t._x1,
    r = t._y1,
    o = t._x2,
    a = t._y2;
  if (t._l01_a > 1e-12) {
    var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
      s = 3 * t._l01_a * (t._l01_a + t._l12_a);
    (i = (i * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / s),
      (r = (r * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / s);
  }
  if (t._l23_a > 1e-12) {
    var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
      h = 3 * t._l23_a * (t._l23_a + t._l12_a);
    (o = (o * c + t._x1 * t._l23_2a - n * t._l12_2a) / h),
      (a = (a * c + t._y1 * t._l23_2a - e * t._l12_2a) / h);
  }
  t._context.bezierCurveTo(i, r, o, a, t._x2, t._y2);
}
function Ce(t, n) {
  (this._context = t), (this._alpha = n);
}
function De(t, n) {
  (this._context = t), (this._alpha = n);
}
function Ae(t, n) {
  (this._context = t), (this._alpha = n);
}
function Ue(t) {
  return t < 0 ? -1 : 1;
}
function Ee(t, n, e) {
  var i = t._x1 - t._x0,
    r = n - t._x1,
    o = (t._y1 - t._y0) / (i || (r < 0 && -0)),
    a = (e - t._y1) / (r || (i < 0 && -0)),
    u = (o * r + a * i) / (i + r);
  return (
    (Ue(o) + Ue(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(u)) || 0
  );
}
function Pe(t, n) {
  var e = t._x1 - t._x0;
  return e ? ((3 * (t._y1 - t._y0)) / e - n) / 2 : n;
}
function Fe(t, n, e) {
  var i = t._x0,
    r = t._y0,
    o = t._x1,
    a = t._y1,
    u = (o - i) / 3;
  t._context.bezierCurveTo(i + u, r + u * n, o - u, a - u * e, o, a);
}
function Ye(t) {
  this._context = t;
}
(pe.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    (this._line || (0 !== this._line && 1 === this._point)) &&
      this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (t, n) {
    switch (((t = +t), (n = +n), this._point)) {
      case 0:
        (this._point = 1),
          this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, n);
    }
  },
}),
  (we.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 3:
          xe(this, this._x1, this._y1);
        case 2:
          this._context.lineTo(this._x1, this._y1);
      }
      (this._line || (0 !== this._line && 1 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      switch (((t = +t), (n = +n), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, n)
              : this._context.moveTo(t, n);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3),
            this._context.lineTo(
              (5 * this._x0 + this._x1) / 6,
              (5 * this._y0 + this._y1) / 6
            );
        default:
          xe(this, t, n);
      }
      (this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = n);
    },
  }),
  (Me.prototype = {
    lineStart: function () {
      (this._x = []), (this._y = []), this._basis.lineStart();
    },
    lineEnd: function () {
      var t = this._x,
        n = this._y,
        e = t.length - 1;
      if (e > 0)
        for (
          var i, r = t[0], o = n[0], a = t[e] - r, u = n[e] - o, s = -1;
          ++s <= e;

        )
          (i = s / e),
            this._basis.point(
              this._beta * t[s] + (1 - this._beta) * (r + i * a),
              this._beta * n[s] + (1 - this._beta) * (o + i * u)
            );
      (this._x = this._y = null), this._basis.lineEnd();
    },
    point: function (t, n) {
      this._x.push(+t), this._y.push(+n);
    },
  }),
  (function t(n) {
    function e(t) {
      return 1 === n ? new we(t) : new Me(t, n);
    }
    return (
      (e.beta = function (n) {
        return t(+n);
      }),
      e
    );
  })(0.85),
  (Te.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);
          break;
        case 3:
          be(this, this._x1, this._y1);
      }
      (this._line || (0 !== this._line && 1 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      switch (((t = +t), (n = +n), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, n)
              : this._context.moveTo(t, n);
          break;
        case 1:
          (this._point = 2), (this._x1 = t), (this._y1 = n);
          break;
        case 2:
          this._point = 3;
        default:
          be(this, t, n);
      }
      (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return new Te(t, n);
    }
    return (
      (e.tension = function (n) {
        return t(+n);
      }),
      e
    );
  })(0),
  (ke.prototype = {
    areaStart: ve,
    areaEnd: ve,
    lineStart: function () {
      (this._x0 =
        this._x1 =
        this._x2 =
        this._x3 =
        this._x4 =
        this._x5 =
        this._y0 =
        this._y1 =
        this._y2 =
        this._y3 =
        this._y4 =
        this._y5 =
          NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;
        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;
        case 3:
          this.point(this._x3, this._y3),
            this.point(this._x4, this._y4),
            this.point(this._x5, this._y5);
      }
    },
    point: function (t, n) {
      switch (((t = +t), (n = +n), this._point)) {
        case 0:
          (this._point = 1), (this._x3 = t), (this._y3 = n);
          break;
        case 1:
          (this._point = 2),
            this._context.moveTo((this._x4 = t), (this._y4 = n));
          break;
        case 2:
          (this._point = 3), (this._x5 = t), (this._y5 = n);
          break;
        default:
          be(this, t, n);
      }
      (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return new ke(t, n);
    }
    return (
      (e.tension = function (n) {
        return t(+n);
      }),
      e
    );
  })(0),
  (Se.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      (this._line || (0 !== this._line && 3 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      switch (((t = +t), (n = +n), this._point)) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3),
            this._line
              ? this._context.lineTo(this._x2, this._y2)
              : this._context.moveTo(this._x2, this._y2);
          break;
        case 3:
          this._point = 4;
        default:
          be(this, t, n);
      }
      (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return new Se(t, n);
    }
    return (
      (e.tension = function (n) {
        return t(+n);
      }),
      e
    );
  })(0),
  (Ce.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
        (this._l01_a =
          this._l12_a =
          this._l23_a =
          this._l01_2a =
          this._l12_2a =
          this._l23_2a =
          this._point =
            0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);
          break;
        case 3:
          this.point(this._x2, this._y2);
      }
      (this._line || (0 !== this._line && 1 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      if (((t = +t), (n = +n), this._point)) {
        var e = this._x2 - t,
          i = this._y2 - n;
        this._l23_a = Math.sqrt(
          (this._l23_2a = Math.pow(e * e + i * i, this._alpha))
        );
      }
      switch (this._point) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, n)
              : this._context.moveTo(t, n);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
        default:
          Ne(this, t, n);
      }
      (this._l01_a = this._l12_a),
        (this._l12_a = this._l23_a),
        (this._l01_2a = this._l12_2a),
        (this._l12_2a = this._l23_2a),
        (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return n ? new Ce(t, n) : new Te(t, 0);
    }
    return (
      (e.alpha = function (n) {
        return t(+n);
      }),
      e
    );
  })(0.5),
  (De.prototype = {
    areaStart: ve,
    areaEnd: ve,
    lineStart: function () {
      (this._x0 =
        this._x1 =
        this._x2 =
        this._x3 =
        this._x4 =
        this._x5 =
        this._y0 =
        this._y1 =
        this._y2 =
        this._y3 =
        this._y4 =
        this._y5 =
          NaN),
        (this._l01_a =
          this._l12_a =
          this._l23_a =
          this._l01_2a =
          this._l12_2a =
          this._l23_2a =
          this._point =
            0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;
        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;
        case 3:
          this.point(this._x3, this._y3),
            this.point(this._x4, this._y4),
            this.point(this._x5, this._y5);
      }
    },
    point: function (t, n) {
      if (((t = +t), (n = +n), this._point)) {
        var e = this._x2 - t,
          i = this._y2 - n;
        this._l23_a = Math.sqrt(
          (this._l23_2a = Math.pow(e * e + i * i, this._alpha))
        );
      }
      switch (this._point) {
        case 0:
          (this._point = 1), (this._x3 = t), (this._y3 = n);
          break;
        case 1:
          (this._point = 2),
            this._context.moveTo((this._x4 = t), (this._y4 = n));
          break;
        case 2:
          (this._point = 3), (this._x5 = t), (this._y5 = n);
          break;
        default:
          Ne(this, t, n);
      }
      (this._l01_a = this._l12_a),
        (this._l12_a = this._l23_a),
        (this._l01_2a = this._l12_2a),
        (this._l12_2a = this._l23_2a),
        (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return n ? new De(t, n) : new ke(t, 0);
    }
    return (
      (e.alpha = function (n) {
        return t(+n);
      }),
      e
    );
  })(0.5),
  (Ae.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
        (this._l01_a =
          this._l12_a =
          this._l23_a =
          this._l01_2a =
          this._l12_2a =
          this._l23_2a =
          this._point =
            0);
    },
    lineEnd: function () {
      (this._line || (0 !== this._line && 3 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      if (((t = +t), (n = +n), this._point)) {
        var e = this._x2 - t,
          i = this._y2 - n;
        this._l23_a = Math.sqrt(
          (this._l23_2a = Math.pow(e * e + i * i, this._alpha))
        );
      }
      switch (this._point) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3),
            this._line
              ? this._context.lineTo(this._x2, this._y2)
              : this._context.moveTo(this._x2, this._y2);
          break;
        case 3:
          this._point = 4;
        default:
          Ne(this, t, n);
      }
      (this._l01_a = this._l12_a),
        (this._l12_a = this._l23_a),
        (this._l01_2a = this._l12_2a),
        (this._l12_2a = this._l23_2a),
        (this._x0 = this._x1),
        (this._x1 = this._x2),
        (this._x2 = t),
        (this._y0 = this._y1),
        (this._y1 = this._y2),
        (this._y2 = n);
    },
  }),
  (function t(n) {
    function e(t) {
      return n ? new Ae(t, n) : new Se(t, 0);
    }
    return (
      (e.alpha = function (n) {
        return t(+n);
      }),
      e
    );
  })(0.5),
  (Ye.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          Fe(this, this._t0, Pe(this, this._t0));
      }
      (this._line || (0 !== this._line && 1 === this._point)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, n) {
      var e = NaN;
      if (((n = +n), (t = +t) !== this._x1 || n !== this._y1)) {
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, n)
                : this._context.moveTo(t, n);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3), Fe(this, Pe(this, (e = Ee(this, t, n))), e);
            break;
          default:
            Fe(this, this._t0, (e = Ee(this, t, n)));
        }
        (this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = n),
          (this._t0 = e);
      }
    },
  }),
  (Object.create(Ye.prototype).point = function (t, n) {
    Ye.prototype.point.call(this, n, t);
  });
var He = { exports: {} };
function Le() {
  et.stopImmediatePropagation();
}
function Oe() {
  et.preventDefault(), et.stopImmediatePropagation();
}
function ze(t) {
  var n = t.document.documentElement,
    e = pt(t).on('dragstart.drag', Oe, !0);
  'onselectstart' in n
    ? e.on('selectstart.drag', Oe, !0)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = 'none'));
}
function je(t) {
  return function () {
    return t;
  };
}
function qe(t, n, e, i, r, o, a, u, s, c) {
  (this.target = t),
    (this.type = n),
    (this.subject = e),
    (this.identifier = i),
    (this.active = r),
    (this.x = o),
    (this.y = a),
    (this.dx = u),
    (this.dy = s),
    (this._ = c);
}
function Ie() {
  return !et.ctrlKey && !et.button;
}
function Ve() {
  return this.parentNode;
}
function Xe(t) {
  return null == t ? { x: et.x, y: et.y } : t;
}
function We() {
  return navigator.maxTouchPoints || 'ontouchstart' in this;
}
function Re() {
  var t,
    n,
    e,
    i,
    r = Ie,
    o = Ve,
    a = Xe,
    u = We,
    s = {},
    c = He.exports.dispatch('start', 'drag', 'end'),
    h = 0,
    l = 0;
  function f(t) {
    t.on('mousedown.drag', _)
      .filter(u)
      .on('touchstart.drag', g)
      .on('touchmove.drag', d)
      .on('touchend.drag touchcancel.drag', m)
      .style('touch-action', 'none')
      .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
  }
  function _() {
    if (!i && r.apply(this, arguments)) {
      var a = v('mouse', o.apply(this, arguments), vt, this, arguments);
      a &&
        (pt(et.view).on('mousemove.drag', p, !0).on('mouseup.drag', y, !0),
        ze(et.view),
        Le(),
        (e = !1),
        (t = et.clientX),
        (n = et.clientY),
        a('start'));
    }
  }
  function p() {
    if ((Oe(), !e)) {
      var i = et.clientX - t,
        r = et.clientY - n;
      e = i * i + r * r > l;
    }
    s.mouse('drag');
  }
  function y() {
    pt(et.view).on('mousemove.drag mouseup.drag', null),
      (function (t, n) {
        var e = t.document.documentElement,
          i = pt(t).on('dragstart.drag', null);
        n &&
          (i.on('click.drag', Oe, !0),
          setTimeout(function () {
            i.on('click.drag', null);
          }, 0)),
          'onselectstart' in e
            ? i.on('selectstart.drag', null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
      })(et.view, e),
      Oe(),
      s.mouse('end');
  }
  function g() {
    if (r.apply(this, arguments)) {
      var t,
        n,
        e = et.changedTouches,
        i = o.apply(this, arguments),
        a = e.length;
      for (t = 0; t < a; ++t)
        (n = v(e[t].identifier, i, xt, this, arguments)) && (Le(), n('start'));
    }
  }
  function d() {
    var t,
      n,
      e = et.changedTouches,
      i = e.length;
    for (t = 0; t < i; ++t) (n = s[e[t].identifier]) && (Oe(), n('drag'));
  }
  function m() {
    var t,
      n,
      e = et.changedTouches,
      r = e.length;
    for (
      i && clearTimeout(i),
        i = setTimeout(function () {
          i = null;
        }, 500),
        t = 0;
      t < r;
      ++t
    )
      (n = s[e[t].identifier]) && (Le(), n('end'));
  }
  function v(t, n, e, i, r) {
    var o,
      u,
      l,
      _ = e(n, t),
      p = c.copy();
    if (
      st(new qe(f, 'beforestart', o, t, h, _[0], _[1], 0, 0, p), function () {
        return (
          null != (et.subject = o = a.apply(i, r)) &&
          ((u = o.x - _[0] || 0), (l = o.y - _[1] || 0), !0)
        );
      })
    )
      return function a(c) {
        var y,
          g = _;
        switch (c) {
          case 'start':
            (s[t] = a), (y = h++);
            break;
          case 'end':
            delete s[t], --h;
          case 'drag':
            (_ = e(n, t)), (y = h);
        }
        st(
          new qe(
            f,
            c,
            o,
            t,
            y,
            _[0] + u,
            _[1] + l,
            _[0] - g[0],
            _[1] - g[1],
            p
          ),
          p.apply,
          p,
          [c, i, r]
        );
      };
  }
  return (
    (f.filter = function (t) {
      return arguments.length
        ? ((r = 'function' == typeof t ? t : je(!!t)), f)
        : r;
    }),
    (f.container = function (t) {
      return arguments.length
        ? ((o = 'function' == typeof t ? t : je(t)), f)
        : o;
    }),
    (f.subject = function (t) {
      return arguments.length
        ? ((a = 'function' == typeof t ? t : je(t)), f)
        : a;
    }),
    (f.touchable = function (t) {
      return arguments.length
        ? ((u = 'function' == typeof t ? t : je(!!t)), f)
        : u;
    }),
    (f.on = function () {
      var t = c.on.apply(c, arguments);
      return t === c ? f : t;
    }),
    (f.clickDistance = function (t) {
      return arguments.length ? ((l = (t = +t) * t), f) : Math.sqrt(l);
    }),
    f
  );
}
!(function (t) {
  var n = { value: function () {} };
  function e() {
    for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
      if (!(t = arguments[n] + '') || t in r || /[\s.]/.test(t))
        throw new Error('illegal type: ' + t);
      r[t] = [];
    }
    return new i(r);
  }
  function i(t) {
    this._ = t;
  }
  function r(t, n) {
    return t
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var e = '',
          i = t.indexOf('.');
        if (
          (i >= 0 && ((e = t.slice(i + 1)), (t = t.slice(0, i))),
          t && !n.hasOwnProperty(t))
        )
          throw new Error('unknown type: ' + t);
        return { type: t, name: e };
      });
  }
  function o(t, n) {
    for (var e, i = 0, r = t.length; i < r; ++i)
      if ((e = t[i]).name === n) return e.value;
  }
  function a(t, e, i) {
    for (var r = 0, o = t.length; r < o; ++r)
      if (t[r].name === e) {
        (t[r] = n), (t = t.slice(0, r).concat(t.slice(r + 1)));
        break;
      }
    return null != i && t.push({ name: e, value: i }), t;
  }
  (i.prototype = e.prototype =
    {
      constructor: i,
      on: function (t, n) {
        var e,
          i = this._,
          u = r(t + '', i),
          s = -1,
          c = u.length;
        if (!(arguments.length < 2)) {
          if (null != n && 'function' != typeof n)
            throw new Error('invalid callback: ' + n);
          for (; ++s < c; )
            if ((e = (t = u[s]).type)) i[e] = a(i[e], t.name, n);
            else if (null == n) for (e in i) i[e] = a(i[e], t.name, null);
          return this;
        }
        for (; ++s < c; )
          if ((e = (t = u[s]).type) && (e = o(i[e], t.name))) return e;
      },
      copy: function () {
        var t = {},
          n = this._;
        for (var e in n) t[e] = n[e].slice();
        return new i(t);
      },
      call: function (t, n) {
        if ((e = arguments.length - 2) > 0)
          for (var e, i, r = new Array(e), o = 0; o < e; ++o)
            r[o] = arguments[o + 2];
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (o = 0, e = (i = this._[t]).length; o < e; ++o)
          i[o].value.apply(n, r);
      },
      apply: function (t, n, e) {
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (var i = this._[t], r = 0, o = i.length; r < o; ++r)
          i[r].value.apply(n, e);
      },
    }),
    (t.dispatch = e),
    Object.defineProperty(t, '__esModule', { value: !0 });
})(He.exports),
  (qe.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);
    return t === this._ ? this : t;
  });
var Be = function (t) {
    return 50 * Math.sin((Math.PI / 50) * t - 0.5 * Math.PI) + 50;
  },
  Ze = function (t) {
    return (25 * (2 * Math.asin((t - 50) / 50) + Math.PI)) / Math.PI;
  },
  $e = function (t) {
    return t >= 80 && t <= 100;
  },
  Ge = function (t, n) {
    var e = t + 5;
    return $e(n) ? -1 * e : e;
  },
  Qe = {
    target: 'svg',
    width: 900,
    height: 300,
    preview: !1,
    darkMode: !1,
    backgroundColor: 'transparent',
    footerText: { show: !0, fontSize: 0.75 },
    margin: { top: 20, right: 20, bottom: 40, left: 20 },
  },
  Je = (function (e) {
    function i(t, n) {
      var i = e.call(this) || this;
      return (
        (i.data = []),
        (i.target = Qe.target),
        (i.width = Qe.width),
        (i.height = Qe.height),
        (i.preview = Qe.preview),
        (i.darkMode = Qe.darkMode),
        (i.backgroundColor = Qe.backgroundColor),
        (i.footerText = Qe.footerText),
        (i.margin = Qe.margin),
        (i.chartWidth = 0),
        (i.chartHeight = 0),
        (i.colorScheme = 'hill-chart-light'),
        (i.svg = pt('svg')),
        (i.xScale = Bt()),
        (i.yScale = Bt()),
        (i.bottomLine = ue(i.xScale)),
        (i.mainLineCurvePoints = []),
        (i.line = me().x(0).y(0)),
        Object.assign(i, Qe, { data: t }, n),
        i.init(),
        i
      );
    }
    return (
      (function (n, e) {
        function i() {
          this.constructor = n;
        }
        t(n, e),
          (n.prototype =
            null === e
              ? Object.create(e)
              : ((i.prototype = e.prototype), new i()));
      })(i, e),
      (i.prototype.init = function () {
        var t = this,
          n = t.width,
          e = t.height,
          i = t.margin,
          r = t.target;
        (this.chartWidth = n - i.left - i.right),
          (this.chartHeight = e - i.top - i.bottom),
          (this.colorScheme = this.darkMode
            ? 'hill-chart-dark'
            : 'hill-chart-light');
        var o = this.darkMode ? '#2f3437' : '#ffffff',
          a = this.backgroundColor,
          u = !0 === a || void 0 === a,
          s = !1 === this.backgroundColor,
          c = u ? o : this.backgroundColor;
        (this.backgroundColor = s ? 'transparent' : c),
          (this.svg = pt(r)
            .attr('class', this.colorScheme)
            .attr('width', n)
            .attr('height', e)
            .attr(
              'style',
              'stroke-width: 0; background-color: '.concat(
                this.backgroundColor,
                ';'
              )
            )
            .append('g')
            .attr(
              'transform',
              'translate('.concat(i.left, ', ').concat(i.top, ')')
            )),
          (this.xScale = Bt().domain([0, 100]).range([0, this.chartWidth])),
          (this.yScale = Bt().domain([0, 100]).range([this.chartHeight, 0])),
          this.normalizeData();
      }),
      (i.prototype.normalizeData = function () {
        this.data = this.data.map(function (t) {
          return {
            id: t.id ? t.id : Math.random().toString(36).slice(-6),
            color: t.color,
            description: t.description,
            link: t.link,
            x: t.x ? t.x : 0,
            y: t.y ? t.y : Be(t.x ? t.x : 0),
            size: t.size ? t.size : 10,
          };
        });
      }),
      (i.prototype.replaceData = function (t) {
        Object.assign(this, { data: t }), this.normalizeData();
      }),
      (i.prototype.replaceAndUpdate = function (t) {
        this.replaceData(t),
          this.svg.selectAll('.hill-chart-group').remove(),
          this.renderGroup();
      }),
      (i.prototype.undraggablePoint = function () {
        var t = this;
        return this.svg
          .selectAll('.hill-chart-group')
          .data(this.data)
          .enter()
          .append('a')
          .attr('href', function (t) {
            return t.link ? t.link : '#';
          })
          .append('g')
          .attr('class', 'hill-chart-group')
          .style('cursor', 'pointer')
          .attr('transform', function (n) {
            return (
              (n.x = t.xScale(n.x)),
              (n.y = t.yScale(n.y)),
              'translate('.concat(n.x, ', ').concat(n.y, ')')
            );
          });
      }),
      (i.prototype.render = function () {
        this.renderBottomLine(5),
          this.renderMainCurve(),
          this.renderMiddleLine(),
          this.footerText.show && this.renderFooterText(),
          this.renderGroup();
      }),
      (i.prototype.renderGroup = function () {
        var t,
          e = this,
          i = this,
          r = Re()
            .on('drag', function (t) {
              var e = et.x;
              !e || e < 0
                ? ((e = 0),
                  i.emit('home', n(n({}, t), { y: Ze(i.yScale.invert(t.y)) })))
                : e > i.chartWidth &&
                  ((e = i.chartWidth),
                  i.emit(
                    'end',
                    n(n({}, t), {
                      x: i.xScale.invert(i.chartWidth),
                      y: Ze(i.yScale.invert(t.y)),
                    })
                  ));
              var r = i.xScale.invert(e);
              (t.x = e), (t.y = i.yScale(Be(r)));
              var o = Ze(i.yScale.invert(t.y)),
                a = { x: r, y: o };
              (pt(this).on('click', function () {
                i.emit('pointClick', n(n({}, t), a));
              }),
              i.preview) ||
                (pt(this)
                  .attr(
                    'transform',
                    'translate('.concat(t.x, ', ').concat(t.y, ')')
                  )
                  .select('text')
                  .style('text-anchor', function () {
                    return $e(r) ? 'end' : 'start';
                  })
                  .attr('x', function (t) {
                    return Ge(t.size, r);
                  }),
                i.emit('move', r, o));
            })
            .on('end', function (t) {
              if (!e.preview) {
                var i = et.x;
                !i || i < 0 ? (i = 0) : i > e.chartWidth && (i = e.chartWidth);
                var r = e.xScale.invert(i);
                t.y = e.yScale(Be(r));
                var o = { x: r, y: Ze(e.yScale.invert(t.y)) };
                e.emit('moved', n(n({}, t), o));
              }
            });
        (t = this.preview
          ? this.undraggablePoint()
          : this.svg
              .selectAll('.hill-chart-group')
              .data(this.data)
              .enter()
              .append('g')
              .attr('class', 'hill-chart-group')
              .attr('transform', function (t) {
                return (
                  (t.x = e.xScale(t.x)),
                  (t.y = e.yScale(t.y)),
                  'translate('.concat(t.x, ', ').concat(t.y, ')')
                );
              })
              .call(r))
          .append('circle')
          .attr('class', 'hill-chart-circle')
          .attr('fill', function (t) {
            return t.color;
          })
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', function (t) {
            return t.size || 10;
          }),
          t
            .append('text')
            .text(function (t) {
              return t.description;
            })
            .attr('x', function (t) {
              return Ge(t.size || 10, e.xScale.invert(t.x));
            })
            .style('text-anchor', function (t) {
              return $e(e.xScale.invert(t.x)) ? 'end' : 'start';
            })
            .attr('y', 5);
      }),
      (i.prototype.renderMainCurve = function () {
        var t = this;
        (this.mainLineCurvePoints = (function (t, n, e) {
          (t = +t),
            (n = +n),
            (e =
              (r = arguments.length) < 2
                ? ((n = t), (t = 0), 1)
                : r < 3
                ? 1
                : +e);
          for (
            var i = -1,
              r = 0 | Math.max(0, Math.ceil((n - t) / e)),
              o = new Array(r);
            ++i < r;

          )
            o[i] = t + i * e;
          return o;
        })(0, 100, 0.1).map(function (t) {
          return { x: t, y: Be(t) };
        })),
          (this.line = me()
            .x(function (n) {
              return t.xScale(n.x);
            })
            .y(function (n) {
              return t.yScale(n.y);
            })),
          this.svg
            .append('path')
            .attr('class', 'chart-hill-main-curve')
            .datum(this.mainLineCurvePoints)
            .attr('d', this.line);
      }),
      (i.prototype.renderBottomLine = function (t) {
        void 0 === t && (t = 5),
          (this.bottomLine = ue(this.xScale).ticks(0).tickSize(0)),
          this.svg
            .append('g')
            .attr('class', 'hill-chart-bottom-line')
            .attr(
              'transform',
              'translate(0, '.concat(this.chartHeight + t, ')')
            )
            .call(this.bottomLine);
      }),
      (i.prototype.renderMiddleLine = function () {
        this.svg
          .append('line')
          .attr('class', 'hill-chart-middle-line')
          .attr('y1', this.yScale(0))
          .attr('y2', this.yScale(100))
          .attr('x2', this.xScale(50))
          .attr('x1', this.xScale(50));
      }),
      (i.prototype.renderFooterText = function () {
        this.svg
          .append('text')
          .attr('class', 'hill-chart-text')
          .text('Figuring things out')
          .style('font-size', ''.concat(this.footerText.fontSize, 'rem'))
          .attr('x', this.xScale(25))
          .attr('y', this.chartHeight + 30),
          this.svg
            .append('text')
            .attr('class', 'hill-chart-text')
            .text('Making it happen')
            .style('font-size', ''.concat(this.footerText.fontSize, 'rem'))
            .attr('x', this.xScale(75))
            .attr('y', this.chartHeight + 30);
      }),
      i
    );
  })(a);
export { Je as default };
//# sourceMappingURL=index.js.map
