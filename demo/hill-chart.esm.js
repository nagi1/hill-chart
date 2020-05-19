function t(t, n) {
  for (var e = 0; e < n.length; e++) {
    var r = n[e];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(t, r.key, r);
  }
}
function n(t, n, e) {
  return (
    n in t
      ? Object.defineProperty(t, n, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[n] = e),
    t
  );
}
function e(t, n) {
  var e = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    n &&
      (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      })),
      e.push.apply(e, r);
  }
  return e;
}
function r(t) {
  for (var r = 1; r < arguments.length; r++) {
    var i = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? e(Object(i), !0).forEach(function (e) {
          n(t, e, i[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
      : e(Object(i)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(i, n));
        });
  }
  return t;
}
function i(t) {
  return (i = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}
function o(t, n) {
  return (o =
    Object.setPrototypeOf ||
    function (t, n) {
      return (t.__proto__ = n), t;
    })(t, n);
}
function a(t) {
  if (void 0 === t)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t;
}
function u(t, n) {
  return !n || ('object' != typeof n && 'function' != typeof n) ? a(t) : n;
}
function s(t) {
  var n = (function () {
    if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ('function' == typeof Proxy) return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  })();
  return function () {
    var e,
      r = i(t);
    if (n) {
      var o = i(this).constructor;
      e = Reflect.construct(r, arguments, o);
    } else e = r.apply(this, arguments);
    return u(this, e);
  };
}
var c = (function () {
  function t(t, n) {
    for (var e = 0; e < n.length; e++) {
      var r = n[e];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  return function (n, e, r) {
    return e && t(n.prototype, e), r && t(n, r), n;
  };
})();
function l(t, n) {
  if (!(t instanceof n))
    throw new TypeError('Cannot call a class as a function');
}
var h = { emitDelay: 10, strictMode: !1 },
  f = (function () {
    function t() {
      var n =
        arguments.length <= 0 || void 0 === arguments[0] ? h : arguments[0];
      l(this, t);
      var e = void 0,
        r = void 0;
      (e = n.hasOwnProperty('emitDelay') ? n.emitDelay : h.emitDelay),
        (this._emitDelay = e),
        (r = n.hasOwnProperty('strictMode') ? n.strictMode : h.strictMode),
        (this._strictMode = r),
        (this._listeners = {}),
        (this.events = []);
    }
    return (
      c(t, [
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
              r,
              i = this,
              o = this.events.indexOf(t);
            t &&
              -1 !== o &&
              (n
                ? ((e = []),
                  (r = i._listeners[t]).forEach(function (t, r) {
                    t.fn === n && e.unshift(r);
                  }),
                  e.forEach(function (t) {
                    r.splice(t, 1);
                  }),
                  r.length || (i.events.splice(o, 1), delete i._listeners[t]))
                : (delete this._listeners[t], this.events.splice(o, 1)));
          },
        },
        {
          key: '_applyEvents',
          value: function (t, n) {
            var e = this._listeners[t];
            if (e && e.length) {
              var r = [];
              e.forEach(function (t, e) {
                t.fn.apply(null, n), t.once && r.unshift(e);
              }),
                r.forEach(function (t) {
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
                r = Array(e > 1 ? e - 1 : 0),
                i = 1;
              i < e;
              i++
            )
              r[i - 1] = arguments[i];
            this._emitDelay
              ? setTimeout(function () {
                  n._applyEvents.call(n, t, r);
                }, this._emitDelay)
              : this._applyEvents(t, r);
          },
        },
        {
          key: 'emitSync',
          value: function (t) {
            for (
              var n = arguments.length, e = Array(n > 1 ? n - 1 : 0), r = 1;
              r < n;
              r++
            )
              e[r - 1] = arguments[r];
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
  p = 'http://www.w3.org/1999/xhtml',
  d = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: p,
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
  };
function g(t) {
  var n = (t += ''),
    e = n.indexOf(':');
  return (
    e >= 0 && 'xmlns' !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
    d.hasOwnProperty(n) ? { space: d[n], local: t } : t
  );
}
function y(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === p && n.documentElement.namespaceURI === p
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function v(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function m(t) {
  var n = g(t);
  return (n.local ? v : y)(n);
}
function _() {}
function w(t) {
  return null == t
    ? _
    : function () {
        return this.querySelector(t);
      };
}
function x() {
  return [];
}
function b(t) {
  return new Array(t.length);
}
function M(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
M.prototype = {
  constructor: M,
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
function k(t, n, e, r, i, o) {
  for (var a, u = 0, s = n.length, c = o.length; u < c; ++u)
    (a = n[u]) ? ((a.__data__ = o[u]), (r[u] = a)) : (e[u] = new M(t, o[u]));
  for (; u < s; ++u) (a = n[u]) && (i[u] = a);
}
function N(t, n, e, r, i, o, a) {
  var u,
    s,
    c,
    l = {},
    h = n.length,
    f = o.length,
    p = new Array(h);
  for (u = 0; u < h; ++u)
    (s = n[u]) &&
      ((p[u] = c = '$' + a.call(s, s.__data__, u, n)),
      c in l ? (i[u] = s) : (l[c] = s));
  for (u = 0; u < f; ++u)
    (s = l[(c = '$' + a.call(t, o[u], u, o))])
      ? ((r[u] = s), (s.__data__ = o[u]), (l[c] = null))
      : (e[u] = new M(t, o[u]));
  for (u = 0; u < h; ++u) (s = n[u]) && l[p[u]] === s && (i[u] = s);
}
function S(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function A(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function E(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function P(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function O(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function j(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function T(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function C(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function L(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function z(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function D(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function q(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    C(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function R(t) {
  return function () {
    delete this[t];
  };
}
function H(t, n) {
  return function () {
    this[t] = n;
  };
}
function I(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    null == e ? delete this[t] : (this[t] = e);
  };
}
function V(t) {
  return t.trim().split(/^|\s+/);
}
function $(t) {
  return t.classList || new B(t);
}
function B(t) {
  (this._node = t), (this._names = V(t.getAttribute('class') || ''));
}
function F(t, n) {
  for (var e = $(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function U(t, n) {
  for (var e = $(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function X(t) {
  return function () {
    F(this, t);
  };
}
function W(t) {
  return function () {
    U(this, t);
  };
}
function Y(t, n) {
  return function () {
    (n.apply(this, arguments) ? F : U)(this, t);
  };
}
function G() {
  this.textContent = '';
}
function Z(t) {
  return function () {
    this.textContent = t;
  };
}
function K(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = null == n ? '' : n;
  };
}
function Q() {
  this.innerHTML = '';
}
function J(t) {
  return function () {
    this.innerHTML = t;
  };
}
function tt(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = null == n ? '' : n;
  };
}
function nt() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function et() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rt() {
  return null;
}
function it() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ot() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function at() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
B.prototype = {
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
var ut = {},
  st = null;
'undefined' != typeof document &&
  ('onmouseenter' in document.documentElement ||
    (ut = { mouseenter: 'mouseover', mouseleave: 'mouseout' }));
function ct(t, n, e) {
  return (
    (t = lt(t, n, e)),
    function (n) {
      var e = n.relatedTarget;
      (e && (e === this || 8 & e.compareDocumentPosition(this))) ||
        t.call(this, n);
    }
  );
}
function lt(t, n, e) {
  return function (r) {
    var i = st;
    st = r;
    try {
      t.call(this, this.__data__, n, e);
    } finally {
      st = i;
    }
  };
}
function ht(t) {
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
function ft(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
        (e = n[r]),
          (t.type && e.type !== t.type) || e.name !== t.name
            ? (n[++i] = e)
            : this.removeEventListener(e.type, e.listener, e.capture);
      ++i ? (n.length = i) : delete this.__on;
    }
  };
}
function pt(t, n, e) {
  var r = ut.hasOwnProperty(t.type) ? ct : lt;
  return function (i, o, a) {
    var u,
      s = this.__on,
      c = r(n, o, a);
    if (s)
      for (var l = 0, h = s.length; l < h; ++l)
        if ((u = s[l]).type === t.type && u.name === t.name)
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
function dt(t, n, e, r) {
  var i = st;
  (t.sourceEvent = st), (st = t);
  try {
    return n.apply(e, r);
  } finally {
    st = i;
  }
}
function gt(t, n, e) {
  var r = C(t),
    i = r.CustomEvent;
  'function' == typeof i
    ? (i = new i(n, e))
    : ((i = r.document.createEvent('Event')),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function yt(t, n) {
  return function () {
    return gt(this, t, n);
  };
}
function vt(t, n) {
  return function () {
    return gt(this, t, n.apply(this, arguments));
  };
}
var mt = [null];
function _t(t, n) {
  (this._groups = t), (this._parents = n);
}
function wt(t) {
  return 'string' == typeof t
    ? new _t([[document.querySelector(t)]], [document.documentElement])
    : new _t([[t]], mt);
}
function xt() {
  for (var t, n = st; (t = n.sourceEvent); ) n = t;
  return n;
}
function bt(t, n) {
  var e = t.ownerSVGElement || t;
  if (e.createSVGPoint) {
    var r = e.createSVGPoint();
    return (
      (r.x = n.clientX),
      (r.y = n.clientY),
      [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
    );
  }
  var i = t.getBoundingClientRect();
  return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
}
function Mt(t) {
  var n = xt();
  return n.changedTouches && (n = n.changedTouches[0]), bt(t, n);
}
function kt(t, n, e) {
  arguments.length < 3 && ((e = n), (n = xt().changedTouches));
  for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
    if ((r = n[i]).identifier === e) return bt(t, r);
  return null;
}
function Nt(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
_t.prototype = function () {
  return new _t([[document.documentElement]], mt);
}.prototype = {
  constructor: _t,
  select: function (t) {
    'function' != typeof t && (t = w(t));
    for (
      var n = this._groups, e = n.length, r = new Array(e), i = 0;
      i < e;
      ++i
    )
      for (
        var o, a, u = n[i], s = u.length, c = (r[i] = new Array(s)), l = 0;
        l < s;
        ++l
      )
        (o = u[l]) &&
          (a = t.call(o, o.__data__, l, u)) &&
          ('__data__' in o && (a.__data__ = o.__data__), (c[l] = a));
    return new _t(r, this._parents);
  },
  selectAll: function (t) {
    'function' != typeof t &&
      (t = (function (t) {
        return null == t
          ? x
          : function () {
              return this.querySelectorAll(t);
            };
      })(t));
    for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
      for (var a, u = n[o], s = u.length, c = 0; c < s; ++c)
        (a = u[c]) && (r.push(t.call(a, a.__data__, c, u)), i.push(a));
    return new _t(r, i);
  },
  filter: function (t) {
    'function' != typeof t &&
      (t = (function (t) {
        return function () {
          return this.matches(t);
        };
      })(t));
    for (
      var n = this._groups, e = n.length, r = new Array(e), i = 0;
      i < e;
      ++i
    )
      for (var o, a = n[i], u = a.length, s = (r[i] = []), c = 0; c < u; ++c)
        (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
    return new _t(r, this._parents);
  },
  data: function (t, n) {
    if (!t)
      return (
        (p = new Array(this.size())),
        (c = -1),
        this.each(function (t) {
          p[++c] = t;
        }),
        p
      );
    var e = n ? N : k,
      r = this._parents,
      i = this._groups;
    'function' != typeof t &&
      (t = (function (t) {
        return function () {
          return t;
        };
      })(t));
    for (
      var o = i.length,
        a = new Array(o),
        u = new Array(o),
        s = new Array(o),
        c = 0;
      c < o;
      ++c
    ) {
      var l = r[c],
        h = i[c],
        f = h.length,
        p = t.call(l, l && l.__data__, c, r),
        d = p.length,
        g = (u[c] = new Array(d)),
        y = (a[c] = new Array(d));
      e(l, h, g, y, (s[c] = new Array(f)), p, n);
      for (var v, m, _ = 0, w = 0; _ < d; ++_)
        if ((v = g[_])) {
          for (_ >= w && (w = _ + 1); !(m = y[w]) && ++w < d; );
          v._next = m || null;
        }
    }
    return ((a = new _t(a, r))._enter = u), (a._exit = s), a;
  },
  enter: function () {
    return new _t(this._enter || this._groups.map(b), this._parents);
  },
  exit: function () {
    return new _t(this._exit || this._groups.map(b), this._parents);
  },
  join: function (t, n, e) {
    var r = this.enter(),
      i = this,
      o = this.exit();
    return (
      (r = 'function' == typeof t ? t(r) : r.append(t + '')),
      null != n && (i = n(i)),
      null == e ? o.remove() : e(o),
      r && i ? r.merge(i).order() : i
    );
  },
  merge: function (t) {
    for (
      var n = this._groups,
        e = t._groups,
        r = n.length,
        i = e.length,
        o = Math.min(r, i),
        a = new Array(r),
        u = 0;
      u < o;
      ++u
    )
      for (
        var s,
          c = n[u],
          l = e[u],
          h = c.length,
          f = (a[u] = new Array(h)),
          p = 0;
        p < h;
        ++p
      )
        (s = c[p] || l[p]) && (f[p] = s);
    for (; u < r; ++u) a[u] = n[u];
    return new _t(a, this._parents);
  },
  order: function () {
    for (var t = this._groups, n = -1, e = t.length; ++n < e; )
      for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
        (r = i[o]) &&
          (a &&
            4 ^ r.compareDocumentPosition(a) &&
            a.parentNode.insertBefore(r, a),
          (a = r));
    return this;
  },
  sort: function (t) {
    function n(n, e) {
      return n && e ? t(n.__data__, e.__data__) : !n - !e;
    }
    t || (t = S);
    for (
      var e = this._groups, r = e.length, i = new Array(r), o = 0;
      o < r;
      ++o
    ) {
      for (
        var a, u = e[o], s = u.length, c = (i[o] = new Array(s)), l = 0;
        l < s;
        ++l
      )
        (a = u[l]) && (c[l] = a);
      c.sort(n);
    }
    return new _t(i, this._parents).order();
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
      for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
        var a = r[i];
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
    for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
      for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
        (i = o[a]) && t.call(i, i.__data__, a, o);
    return this;
  },
  attr: function (t, n) {
    var e = g(t);
    if (arguments.length < 2) {
      var r = this.node();
      return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
    }
    return this.each(
      (null == n
        ? e.local
          ? E
          : A
        : 'function' == typeof n
        ? e.local
          ? T
          : j
        : e.local
        ? O
        : P)(e, n)
    );
  },
  style: function (t, n, e) {
    return arguments.length > 1
      ? this.each(
          (null == n ? L : 'function' == typeof n ? D : z)(
            t,
            n,
            null == e ? '' : e
          )
        )
      : q(this.node(), t);
  },
  property: function (t, n) {
    return arguments.length > 1
      ? this.each((null == n ? R : 'function' == typeof n ? I : H)(t, n))
      : this.node()[t];
  },
  classed: function (t, n) {
    var e = V(t + '');
    if (arguments.length < 2) {
      for (var r = $(this.node()), i = -1, o = e.length; ++i < o; )
        if (!r.contains(e[i])) return !1;
      return !0;
    }
    return this.each(('function' == typeof n ? Y : n ? X : W)(e, n));
  },
  text: function (t) {
    return arguments.length
      ? this.each(null == t ? G : ('function' == typeof t ? K : Z)(t))
      : this.node().textContent;
  },
  html: function (t) {
    return arguments.length
      ? this.each(null == t ? Q : ('function' == typeof t ? tt : J)(t))
      : this.node().innerHTML;
  },
  raise: function () {
    return this.each(nt);
  },
  lower: function () {
    return this.each(et);
  },
  append: function (t) {
    var n = 'function' == typeof t ? t : m(t);
    return this.select(function () {
      return this.appendChild(n.apply(this, arguments));
    });
  },
  insert: function (t, n) {
    var e = 'function' == typeof t ? t : m(t),
      r = null == n ? rt : 'function' == typeof n ? n : w(n);
    return this.select(function () {
      return this.insertBefore(
        e.apply(this, arguments),
        r.apply(this, arguments) || null
      );
    });
  },
  remove: function () {
    return this.each(it);
  },
  clone: function (t) {
    return this.select(t ? at : ot);
  },
  datum: function (t) {
    return arguments.length
      ? this.property('__data__', t)
      : this.node().__data__;
  },
  on: function (t, n, e) {
    var r,
      i,
      o = ht(t + ''),
      a = o.length;
    if (!(arguments.length < 2)) {
      for (u = n ? pt : ft, null == e && (e = !1), r = 0; r < a; ++r)
        this.each(u(o[r], n, e));
      return this;
    }
    var u = this.node().__on;
    if (u)
      for (var s, c = 0, l = u.length; c < l; ++c)
        for (r = 0, s = u[c]; r < a; ++r)
          if ((i = o[r]).type === s.type && i.name === s.name) return s.value;
  },
  dispatch: function (t, n) {
    return this.each(('function' == typeof n ? vt : yt)(t, n));
  },
};
var St,
  At,
  Et = (1 === (St = Nt).length &&
    ((At = St),
    (St = function (t, n) {
      return Nt(At(t), n);
    })),
  {
    left: function (t, n, e, r) {
      for (null == e && (e = 0), null == r && (r = t.length); e < r; ) {
        var i = (e + r) >>> 1;
        St(t[i], n) < 0 ? (e = i + 1) : (r = i);
      }
      return e;
    },
    right: function (t, n, e, r) {
      for (null == e && (e = 0), null == r && (r = t.length); e < r; ) {
        var i = (e + r) >>> 1;
        St(t[i], n) > 0 ? (r = i) : (e = i + 1);
      }
      return e;
    },
  }).right;
var Pt = Math.sqrt(50),
  Ot = Math.sqrt(10),
  jt = Math.sqrt(2);
function Tt(t, n, e) {
  var r = (n - t) / Math.max(0, e),
    i = Math.floor(Math.log(r) / Math.LN10),
    o = r / Math.pow(10, i);
  return i >= 0
    ? (o >= Pt ? 10 : o >= Ot ? 5 : o >= jt ? 2 : 1) * Math.pow(10, i)
    : -Math.pow(10, -i) / (o >= Pt ? 10 : o >= Ot ? 5 : o >= jt ? 2 : 1);
}
function Ct(t, n) {
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
function Lt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function zt(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function Dt() {}
var qt = '\\s*([+-]?\\d+)\\s*',
  Rt = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  Ht = '\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  It = /^#([0-9a-f]{3,8})$/,
  Vt = new RegExp('^rgb\\(' + [qt, qt, qt] + '\\)$'),
  $t = new RegExp('^rgb\\(' + [Ht, Ht, Ht] + '\\)$'),
  Bt = new RegExp('^rgba\\(' + [qt, qt, qt, Rt] + '\\)$'),
  Ft = new RegExp('^rgba\\(' + [Ht, Ht, Ht, Rt] + '\\)$'),
  Ut = new RegExp('^hsl\\(' + [Rt, Ht, Ht] + '\\)$'),
  Xt = new RegExp('^hsla\\(' + [Rt, Ht, Ht, Rt] + '\\)$'),
  Wt = {
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
function Yt() {
  return this.rgb().formatHex();
}
function Gt() {
  return this.rgb().formatRgb();
}
function Zt(t) {
  var n, e;
  return (
    (t = (t + '').trim().toLowerCase()),
    (n = It.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        6 === e
          ? Kt(n)
          : 3 === e
          ? new nn(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (240 & n),
              ((15 & n) << 4) | (15 & n),
              1
            )
          : 8 === e
          ? Qt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (255 & n) / 255
            )
          : 4 === e
          ? Qt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (240 & n),
              (((15 & n) << 4) | (15 & n)) / 255
            )
          : null)
      : (n = Vt.exec(t))
      ? new nn(n[1], n[2], n[3], 1)
      : (n = $t.exec(t))
      ? new nn((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, 1)
      : (n = Bt.exec(t))
      ? Qt(n[1], n[2], n[3], n[4])
      : (n = Ft.exec(t))
      ? Qt((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, n[4])
      : (n = Ut.exec(t))
      ? an(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Xt.exec(t))
      ? an(n[1], n[2] / 100, n[3] / 100, n[4])
      : Wt.hasOwnProperty(t)
      ? Kt(Wt[t])
      : 'transparent' === t
      ? new nn(NaN, NaN, NaN, 0)
      : null
  );
}
function Kt(t) {
  return new nn((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
}
function Qt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new nn(t, n, e, r);
}
function Jt(t) {
  return (
    t instanceof Dt || (t = Zt(t)),
    t ? new nn((t = t.rgb()).r, t.g, t.b, t.opacity) : new nn()
  );
}
function tn(t, n, e, r) {
  return 1 === arguments.length ? Jt(t) : new nn(t, n, e, null == r ? 1 : r);
}
function nn(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
function en() {
  return '#' + on(this.r) + on(this.g) + on(this.b);
}
function rn() {
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
function on(t) {
  return (
    ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? '0' : '') +
    t.toString(16)
  );
}
function an(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new sn(t, n, e, r)
  );
}
function un(t) {
  if (t instanceof sn) return new sn(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Dt || (t = Zt(t)), !t)) return new sn();
  if (t instanceof sn) return t;
  var n = (t = t.rgb()).r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return (
    u
      ? ((a =
          n === o
            ? (e - r) / u + 6 * (e < r)
            : e === o
            ? (r - n) / u + 2
            : (n - e) / u + 4),
        (u /= s < 0.5 ? o + i : 2 - o - i),
        (a *= 60))
      : (u = s > 0 && s < 1 ? 0 : a),
    new sn(a, u, s, t.opacity)
  );
}
function sn(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
function cn(t, n, e) {
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
function ln(t) {
  return function () {
    return t;
  };
}
function hn(t) {
  return 1 == (t = +t)
    ? fn
    : function (n, e) {
        return e - n
          ? (function (t, n, e) {
              return (
                (t = Math.pow(t, e)),
                (n = Math.pow(n, e) - t),
                (e = 1 / e),
                function (r) {
                  return Math.pow(t + r * n, e);
                }
              );
            })(n, e, t)
          : ln(isNaN(n) ? e : n);
      };
}
function fn(t, n) {
  var e = n - t;
  return e
    ? (function (t, n) {
        return function (e) {
          return t + e * n;
        };
      })(t, e)
    : ln(isNaN(t) ? n : t);
}
Lt(Dt, Zt, {
  copy: function (t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: Yt,
  formatHex: Yt,
  formatHsl: function () {
    return un(this).formatHsl();
  },
  formatRgb: Gt,
  toString: Gt,
}),
  Lt(
    nn,
    tn,
    zt(Dt, {
      brighter: function (t) {
        return (
          (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
          new nn(this.r * t, this.g * t, this.b * t, this.opacity)
        );
      },
      darker: function (t) {
        return (
          (t = null == t ? 0.7 : Math.pow(0.7, t)),
          new nn(this.r * t, this.g * t, this.b * t, this.opacity)
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
      hex: en,
      formatHex: en,
      formatRgb: rn,
      toString: rn,
    })
  ),
  Lt(
    sn,
    function (t, n, e, r) {
      return 1 === arguments.length
        ? un(t)
        : new sn(t, n, e, null == r ? 1 : r);
    },
    zt(Dt, {
      brighter: function (t) {
        return (
          (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
          new sn(this.h, this.s, this.l * t, this.opacity)
        );
      },
      darker: function (t) {
        return (
          (t = null == t ? 0.7 : Math.pow(0.7, t)),
          new sn(this.h, this.s, this.l * t, this.opacity)
        );
      },
      rgb: function () {
        var t = (this.h % 360) + 360 * (this.h < 0),
          n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
          e = this.l,
          r = e + (e < 0.5 ? e : 1 - e) * n,
          i = 2 * e - r;
        return new nn(
          cn(t >= 240 ? t - 240 : t + 120, i, r),
          cn(t, i, r),
          cn(t < 120 ? t + 240 : t - 120, i, r),
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
var pn = (function t(n) {
  var e = hn(n);
  function r(t, n) {
    var r = e((t = tn(t)).r, (n = tn(n)).r),
      i = e(t.g, n.g),
      o = e(t.b, n.b),
      a = fn(t.opacity, n.opacity);
    return function (n) {
      return (
        (t.r = r(n)), (t.g = i(n)), (t.b = o(n)), (t.opacity = a(n)), t + ''
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function dn(t, n) {
  n || (n = []);
  var e,
    r = t ? Math.min(n.length, t.length) : 0,
    i = n.slice();
  return function (o) {
    for (e = 0; e < r; ++e) i[e] = t[e] * (1 - o) + n[e] * o;
    return i;
  };
}
function gn(t, n) {
  var e,
    r = n ? n.length : 0,
    i = t ? Math.min(r, t.length) : 0,
    o = new Array(i),
    a = new Array(r);
  for (e = 0; e < i; ++e) o[e] = bn(t[e], n[e]);
  for (; e < r; ++e) a[e] = n[e];
  return function (t) {
    for (e = 0; e < i; ++e) a[e] = o[e](t);
    return a;
  };
}
function yn(t, n) {
  var e = new Date();
  return (
    (t = +t),
    (n = +n),
    function (r) {
      return e.setTime(t * (1 - r) + n * r), e;
    }
  );
}
function vn(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
function mn(t, n) {
  var e,
    r = {},
    i = {};
  for (e in ((null !== t && 'object' == typeof t) || (t = {}),
  (null !== n && 'object' == typeof n) || (n = {}),
  n))
    e in t ? (r[e] = bn(t[e], n[e])) : (i[e] = n[e]);
  return function (t) {
    for (e in r) i[e] = r[e](t);
    return i;
  };
}
var _n = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  wn = new RegExp(_n.source, 'g');
function xn(t, n) {
  var e,
    r,
    i,
    o = (_n.lastIndex = wn.lastIndex = 0),
    a = -1,
    u = [],
    s = [];
  for (t += '', n += ''; (e = _n.exec(t)) && (r = wn.exec(n)); )
    (i = r.index) > o &&
      ((i = n.slice(o, i)), u[a] ? (u[a] += i) : (u[++a] = i)),
      (e = e[0]) === (r = r[0])
        ? u[a]
          ? (u[a] += r)
          : (u[++a] = r)
        : ((u[++a] = null), s.push({ i: a, x: vn(e, r) })),
      (o = wn.lastIndex);
  return (
    o < n.length && ((i = n.slice(o)), u[a] ? (u[a] += i) : (u[++a] = i)),
    u.length < 2
      ? s[0]
        ? (function (t) {
            return function (n) {
              return t(n) + '';
            };
          })(s[0].x)
        : (function (t) {
            return function () {
              return t;
            };
          })(n)
      : ((n = s.length),
        function (t) {
          for (var e, r = 0; r < n; ++r) u[(e = s[r]).i] = e.x(t);
          return u.join('');
        })
  );
}
function bn(t, n) {
  var e,
    r = typeof n;
  return null == n || 'boolean' === r
    ? ln(n)
    : ('number' === r
        ? vn
        : 'string' === r
        ? (e = Zt(n))
          ? ((n = e), pn)
          : xn
        : n instanceof Zt
        ? pn
        : n instanceof Date
        ? yn
        : (function (t) {
            return ArrayBuffer.isView(t) && !(t instanceof DataView);
          })(n)
        ? dn
        : Array.isArray(n)
        ? gn
        : ('function' != typeof n.valueOf && 'function' != typeof n.toString) ||
          isNaN(n)
        ? mn
        : vn)(t, n);
}
function Mn(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return Math.round(t * (1 - e) + n * e);
    }
  );
}
function kn(t) {
  return +t;
}
var Nn = [0, 1];
function Sn(t) {
  return t;
}
function An(t, n) {
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
function En(t, n, e) {
  var r = t[0],
    i = t[1],
    o = n[0],
    a = n[1];
  return (
    i < r ? ((r = An(i, r)), (o = e(a, o))) : ((r = An(r, i)), (o = e(o, a))),
    function (t) {
      return o(r(t));
    }
  );
}
function Pn(t, n, e) {
  var r = Math.min(t.length, n.length) - 1,
    i = new Array(r),
    o = new Array(r),
    a = -1;
  for (
    t[r] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
    ++a < r;

  )
    (i[a] = An(t[a], t[a + 1])), (o[a] = e(n[a], n[a + 1]));
  return function (n) {
    var e = Et(t, n, 1, r) - 1;
    return o[e](i[e](n));
  };
}
function On(t, n) {
  return n
    .domain(t.domain())
    .range(t.range())
    .interpolate(t.interpolate())
    .clamp(t.clamp())
    .unknown(t.unknown());
}
function jn() {
  var t,
    n,
    e,
    r,
    i,
    o,
    a = Nn,
    u = Nn,
    s = bn,
    c = Sn;
  function l() {
    var t,
      n,
      e,
      s = Math.min(a.length, u.length);
    return (
      c !== Sn &&
        ((t = a[0]),
        (n = a[s - 1]),
        t > n && ((e = t), (t = n), (n = e)),
        (c = function (e) {
          return Math.max(t, Math.min(n, e));
        })),
      (r = s > 2 ? Pn : En),
      (i = o = null),
      h
    );
  }
  function h(n) {
    return isNaN((n = +n)) ? e : (i || (i = r(a.map(t), u, s)))(t(c(n)));
  }
  return (
    (h.invert = function (e) {
      return c(n((o || (o = r(u, a.map(t), vn)))(e)));
    }),
    (h.domain = function (t) {
      return arguments.length ? ((a = Array.from(t, kn)), l()) : a.slice();
    }),
    (h.range = function (t) {
      return arguments.length ? ((u = Array.from(t)), l()) : u.slice();
    }),
    (h.rangeRound = function (t) {
      return (u = Array.from(t)), (s = Mn), l();
    }),
    (h.clamp = function (t) {
      return arguments.length ? ((c = !!t || Sn), l()) : c !== Sn;
    }),
    (h.interpolate = function (t) {
      return arguments.length ? ((s = t), l()) : s;
    }),
    (h.unknown = function (t) {
      return arguments.length ? ((e = t), h) : e;
    }),
    function (e, r) {
      return (t = e), (n = r), l();
    }
  );
}
function Tn() {
  return jn()(Sn, Sn);
}
function Cn(t, n) {
  if (
    (e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf('e')) < 0
  )
    return null;
  var e,
    r = t.slice(0, e);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
}
function Ln(t) {
  return (t = Cn(Math.abs(t))) ? t[1] : NaN;
}
var zn,
  Dn = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function qn(t) {
  if (!(n = Dn.exec(t))) throw new Error('invalid format: ' + t);
  var n;
  return new Rn({
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
function Rn(t) {
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
function Hn(t, n) {
  var e = Cn(t, n);
  if (!e) return t + '';
  var r = e[0],
    i = e[1];
  return i < 0
    ? '0.' + new Array(-i).join('0') + r
    : r.length > i + 1
    ? r.slice(0, i + 1) + '.' + r.slice(i + 1)
    : r + new Array(i - r.length + 2).join('0');
}
(qn.prototype = Rn.prototype),
  (Rn.prototype.toString = function () {
    return (
      this.fill +
      this.align +
      this.sign +
      this.symbol +
      (this.zero ? '0' : '') +
      (void 0 === this.width ? '' : Math.max(1, 0 | this.width)) +
      (this.comma ? ',' : '') +
      (void 0 === this.precision ? '' : '.' + Math.max(0, 0 | this.precision)) +
      (this.trim ? '~' : '') +
      this.type
    );
  });
var In = {
  '%': function (t, n) {
    return (100 * t).toFixed(n);
  },
  b: function (t) {
    return Math.round(t).toString(2);
  },
  c: function (t) {
    return t + '';
  },
  d: function (t) {
    return Math.round(t).toString(10);
  },
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
    return Hn(100 * t, n);
  },
  r: Hn,
  s: function (t, n) {
    var e = Cn(t, n);
    if (!e) return t + '';
    var r = e[0],
      i = e[1],
      o = i - (zn = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
      a = r.length;
    return o === a
      ? r
      : o > a
      ? r + new Array(o - a + 1).join('0')
      : o > 0
      ? r.slice(0, o) + '.' + r.slice(o)
      : '0.' + new Array(1 - o).join('0') + Cn(t, Math.max(0, n + o - 1))[0];
  },
  X: function (t) {
    return Math.round(t).toString(16).toUpperCase();
  },
  x: function (t) {
    return Math.round(t).toString(16);
  },
};
function Vn(t) {
  return t;
}
var $n,
  Bn,
  Fn,
  Un = Array.prototype.map,
  Xn = [
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
function Wn(t) {
  var n,
    e,
    r =
      void 0 === t.grouping || void 0 === t.thousands
        ? Vn
        : ((n = Un.call(t.grouping, Number)),
          (e = t.thousands + ''),
          function (t, r) {
            for (
              var i = t.length, o = [], a = 0, u = n[0], s = 0;
              i > 0 &&
              u > 0 &&
              (s + u + 1 > r && (u = Math.max(1, r - s)),
              o.push(t.substring((i -= u), i + u)),
              !((s += u + 1) > r));

            )
              u = n[(a = (a + 1) % n.length)];
            return o.reverse().join(e);
          }),
    i = void 0 === t.currency ? '' : t.currency[0] + '',
    o = void 0 === t.currency ? '' : t.currency[1] + '',
    a = void 0 === t.decimal ? '.' : t.decimal + '',
    u =
      void 0 === t.numerals
        ? Vn
        : (function (t) {
            return function (n) {
              return n.replace(/[0-9]/g, function (n) {
                return t[+n];
              });
            };
          })(Un.call(t.numerals, String)),
    s = void 0 === t.percent ? '%' : t.percent + '',
    c = void 0 === t.minus ? '-' : t.minus + '',
    l = void 0 === t.nan ? 'NaN' : t.nan + '';
  function h(t) {
    var n = (t = qn(t)).fill,
      e = t.align,
      h = t.sign,
      f = t.symbol,
      p = t.zero,
      d = t.width,
      g = t.comma,
      y = t.precision,
      v = t.trim,
      m = t.type;
    'n' === m
      ? ((g = !0), (m = 'g'))
      : In[m] || (void 0 === y && (y = 12), (v = !0), (m = 'g')),
      (p || ('0' === n && '=' === e)) && ((p = !0), (n = '0'), (e = '='));
    var _ =
        '$' === f
          ? i
          : '#' === f && /[boxX]/.test(m)
          ? '0' + m.toLowerCase()
          : '',
      w = '$' === f ? o : /[%p]/.test(m) ? s : '',
      x = In[m],
      b = /[defgprs%]/.test(m);
    function M(t) {
      var i,
        o,
        s,
        f = _,
        M = w;
      if ('c' === m) (M = x(t) + M), (t = '');
      else {
        var k = (t = +t) < 0 || 1 / t < 0;
        if (
          ((t = isNaN(t) ? l : x(Math.abs(t), y)),
          v &&
            (t = (function (t) {
              t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
                switch (t[r]) {
                  case '.':
                    i = n = r;
                    break;
                  case '0':
                    0 === i && (i = r), (n = r);
                    break;
                  default:
                    if (!+t[r]) break t;
                    i > 0 && (i = 0);
                }
              return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t;
            })(t)),
          k && 0 == +t && '+' !== h && (k = !1),
          (f = (k ? ('(' === h ? h : c) : '-' === h || '(' === h ? '' : h) + f),
          (M =
            ('s' === m ? Xn[8 + zn / 3] : '') +
            M +
            (k && '(' === h ? ')' : '')),
          b)
        )
          for (i = -1, o = t.length; ++i < o; )
            if (48 > (s = t.charCodeAt(i)) || s > 57) {
              (M = (46 === s ? a + t.slice(i + 1) : t.slice(i)) + M),
                (t = t.slice(0, i));
              break;
            }
      }
      g && !p && (t = r(t, 1 / 0));
      var N = f.length + t.length + M.length,
        S = N < d ? new Array(d - N + 1).join(n) : '';
      switch (
        (g && p && ((t = r(S + t, S.length ? d - M.length : 1 / 0)), (S = '')),
        e)
      ) {
        case '<':
          t = f + t + M + S;
          break;
        case '=':
          t = f + S + t + M;
          break;
        case '^':
          t = S.slice(0, (N = S.length >> 1)) + f + t + M + S.slice(N);
          break;
        default:
          t = S + f + t + M;
      }
      return u(t);
    }
    return (
      (y =
        void 0 === y
          ? 6
          : /[gprs]/.test(m)
          ? Math.max(1, Math.min(21, y))
          : Math.max(0, Math.min(20, y))),
      (M.toString = function () {
        return t + '';
      }),
      M
    );
  }
  return {
    format: h,
    formatPrefix: function (t, n) {
      var e = h((((t = qn(t)).type = 'f'), t)),
        r = 3 * Math.max(-8, Math.min(8, Math.floor(Ln(n) / 3))),
        i = Math.pow(10, -r),
        o = Xn[8 + r / 3];
      return function (t) {
        return e(i * t) + o;
      };
    },
  };
}
function Yn(t, n, e, r) {
  var i,
    o = (function (t, n, e) {
      var r = Math.abs(n - t) / Math.max(0, e),
        i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
        o = r / i;
      return (
        o >= Pt ? (i *= 10) : o >= Ot ? (i *= 5) : o >= jt && (i *= 2),
        n < t ? -i : i
      );
    })(t, n, e);
  switch ((r = qn(null == r ? ',f' : r)).type) {
    case 's':
      var a = Math.max(Math.abs(t), Math.abs(n));
      return (
        null != r.precision ||
          isNaN(
            (i = (function (t, n) {
              return Math.max(
                0,
                3 * Math.max(-8, Math.min(8, Math.floor(Ln(n) / 3))) -
                  Ln(Math.abs(t))
              );
            })(o, a))
          ) ||
          (r.precision = i),
        Fn(r, a)
      );
    case '':
    case 'e':
    case 'g':
    case 'p':
    case 'r':
      null != r.precision ||
        isNaN(
          (i = (function (t, n) {
            return (
              (t = Math.abs(t)),
              (n = Math.abs(n) - t),
              Math.max(0, Ln(n) - Ln(t)) + 1
            );
          })(o, Math.max(Math.abs(t), Math.abs(n))))
        ) ||
        (r.precision = i - ('e' === r.type));
      break;
    case 'f':
    case '%':
      null != r.precision ||
        isNaN(
          (i = (function (t) {
            return Math.max(0, -Ln(Math.abs(t)));
          })(o))
        ) ||
        (r.precision = i - 2 * ('%' === r.type));
  }
  return Bn(r);
}
function Gn(t) {
  var n = t.domain;
  return (
    (t.ticks = function (t) {
      var e = n();
      return (function (t, n, e) {
        var r,
          i,
          o,
          a,
          u = -1;
        if (((e = +e), (t = +t) === (n = +n) && e > 0)) return [t];
        if (
          ((r = n < t) && ((i = t), (t = n), (n = i)),
          0 === (a = Tt(t, n, e)) || !isFinite(a))
        )
          return [];
        if (a > 0)
          for (
            t = Math.ceil(t / a),
              n = Math.floor(n / a),
              o = new Array((i = Math.ceil(n - t + 1)));
            ++u < i;

          )
            o[u] = (t + u) * a;
        else
          for (
            t = Math.floor(t * a),
              n = Math.ceil(n * a),
              o = new Array((i = Math.ceil(t - n + 1)));
            ++u < i;

          )
            o[u] = (t - u) / a;
        return r && o.reverse(), o;
      })(e[0], e[e.length - 1], null == t ? 10 : t);
    }),
    (t.tickFormat = function (t, e) {
      var r = n();
      return Yn(r[0], r[r.length - 1], null == t ? 10 : t, e);
    }),
    (t.nice = function (e) {
      null == e && (e = 10);
      var r,
        i = n(),
        o = 0,
        a = i.length - 1,
        u = i[o],
        s = i[a];
      return (
        s < u && ((r = u), (u = s), (s = r), (r = o), (o = a), (a = r)),
        (r = Tt(u, s, e)) > 0
          ? (r = Tt((u = Math.floor(u / r) * r), (s = Math.ceil(s / r) * r), e))
          : r < 0 &&
            (r = Tt(
              (u = Math.ceil(u * r) / r),
              (s = Math.floor(s * r) / r),
              e
            )),
        r > 0
          ? ((i[o] = Math.floor(u / r) * r),
            (i[a] = Math.ceil(s / r) * r),
            n(i))
          : r < 0 &&
            ((i[o] = Math.ceil(u * r) / r),
            (i[a] = Math.floor(s * r) / r),
            n(i)),
        t
      );
    }),
    t
  );
}
function Zn() {
  var t = Tn();
  return (
    (t.copy = function () {
      return On(t, Zn());
    }),
    Ct.apply(t, arguments),
    Gn(t)
  );
}
($n = Wn({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['$', ''],
  minus: '-',
})),
  (Bn = $n.format),
  (Fn = $n.formatPrefix);
var Kn = Array.prototype.slice;
function Qn(t) {
  return t;
}
function Jn(t) {
  return 'translate(' + (t + 0.5) + ',0)';
}
function te(t) {
  return 'translate(0,' + (t + 0.5) + ')';
}
function ne(t) {
  return function (n) {
    return +t(n);
  };
}
function ee(t) {
  var n = Math.max(0, t.bandwidth() - 1) / 2;
  return (
    t.round() && (n = Math.round(n)),
    function (e) {
      return +t(e) + n;
    }
  );
}
function re() {
  return !this.__axis;
}
function ie(t, n) {
  var e = [],
    r = null,
    i = null,
    o = 6,
    a = 6,
    u = 3,
    s = 1 === t || 4 === t ? -1 : 1,
    c = 4 === t || 2 === t ? 'x' : 'y',
    l = 1 === t || 3 === t ? Jn : te;
  function h(h) {
    var f = null == r ? (n.ticks ? n.ticks.apply(n, e) : n.domain()) : r,
      p = null == i ? (n.tickFormat ? n.tickFormat.apply(n, e) : Qn) : i,
      d = Math.max(o, 0) + u,
      g = n.range(),
      y = +g[0] + 0.5,
      v = +g[g.length - 1] + 0.5,
      m = (n.bandwidth ? ee : ne)(n.copy()),
      _ = h.selection ? h.selection() : h,
      w = _.selectAll('.domain').data([null]),
      x = _.selectAll('.tick').data(f, n).order(),
      b = x.exit(),
      M = x.enter().append('g').attr('class', 'tick'),
      k = x.select('line'),
      N = x.select('text');
    (w = w.merge(
      w
        .enter()
        .insert('path', '.tick')
        .attr('class', 'domain')
        .attr('stroke', 'currentColor')
    )),
      (x = x.merge(M)),
      (k = k.merge(
        M.append('line')
          .attr('stroke', 'currentColor')
          .attr(c + '2', s * o)
      )),
      (N = N.merge(
        M.append('text')
          .attr('fill', 'currentColor')
          .attr(c, s * d)
          .attr('dy', 1 === t ? '0em' : 3 === t ? '0.71em' : '0.32em')
      )),
      h !== _ &&
        ((w = w.transition(h)),
        (x = x.transition(h)),
        (k = k.transition(h)),
        (N = N.transition(h)),
        (b = b
          .transition(h)
          .attr('opacity', 1e-6)
          .attr('transform', function (t) {
            return isFinite((t = m(t))) ? l(t) : this.getAttribute('transform');
          })),
        M.attr('opacity', 1e-6).attr('transform', function (t) {
          var n = this.parentNode.__axis;
          return l(n && isFinite((n = n(t))) ? n : m(t));
        })),
      b.remove(),
      w.attr(
        'd',
        4 === t || 2 == t
          ? a
            ? 'M' + s * a + ',' + y + 'H0.5V' + v + 'H' + s * a
            : 'M0.5,' + y + 'V' + v
          : a
          ? 'M' + y + ',' + s * a + 'V0.5H' + v + 'V' + s * a
          : 'M' + y + ',0.5H' + v
      ),
      x.attr('opacity', 1).attr('transform', function (t) {
        return l(m(t));
      }),
      k.attr(c + '2', s * o),
      N.attr(c, s * d).text(p),
      _.filter(re)
        .attr('fill', 'none')
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 2 === t ? 'start' : 4 === t ? 'end' : 'middle'),
      _.each(function () {
        this.__axis = m;
      });
  }
  return (
    (h.scale = function (t) {
      return arguments.length ? ((n = t), h) : n;
    }),
    (h.ticks = function () {
      return (e = Kn.call(arguments)), h;
    }),
    (h.tickArguments = function (t) {
      return arguments.length
        ? ((e = null == t ? [] : Kn.call(t)), h)
        : e.slice();
    }),
    (h.tickValues = function (t) {
      return arguments.length
        ? ((r = null == t ? null : Kn.call(t)), h)
        : r && r.slice();
    }),
    (h.tickFormat = function (t) {
      return arguments.length ? ((i = t), h) : i;
    }),
    (h.tickSize = function (t) {
      return arguments.length ? ((o = a = +t), h) : o;
    }),
    (h.tickSizeInner = function (t) {
      return arguments.length ? ((o = +t), h) : o;
    }),
    (h.tickSizeOuter = function (t) {
      return arguments.length ? ((a = +t), h) : a;
    }),
    (h.tickPadding = function (t) {
      return arguments.length ? ((u = +t), h) : u;
    }),
    h
  );
}
function oe(t) {
  return ie(3, t);
}
var ae = Math.PI,
  ue = 2 * ae,
  se = ue - 1e-6;
function ce() {
  (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = '');
}
function le() {
  return new ce();
}
function he(t) {
  return function () {
    return t;
  };
}
function fe(t) {
  this._context = t;
}
function pe(t) {
  return new fe(t);
}
function de(t) {
  return t[0];
}
function ge(t) {
  return t[1];
}
(ce.prototype = le.prototype = {
  constructor: ce,
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
  quadraticCurveTo: function (t, n, e, r) {
    this._ +=
      'Q' + +t + ',' + +n + ',' + (this._x1 = +e) + ',' + (this._y1 = +r);
  },
  bezierCurveTo: function (t, n, e, r, i, o) {
    this._ +=
      'C' +
      +t +
      ',' +
      +n +
      ',' +
      +e +
      ',' +
      +r +
      ',' +
      (this._x1 = +i) +
      ',' +
      (this._y1 = +o);
  },
  arcTo: function (t, n, e, r, i) {
    (t = +t), (n = +n), (e = +e), (r = +r), (i = +i);
    var o = this._x1,
      a = this._y1,
      u = e - t,
      s = r - n,
      c = o - t,
      l = a - n,
      h = c * c + l * l;
    if (i < 0) throw new Error('negative radius: ' + i);
    if (null === this._x1)
      this._ += 'M' + (this._x1 = t) + ',' + (this._y1 = n);
    else if (h > 1e-6)
      if (Math.abs(l * u - s * c) > 1e-6 && i) {
        var f = e - o,
          p = r - a,
          d = u * u + s * s,
          g = f * f + p * p,
          y = Math.sqrt(d),
          v = Math.sqrt(h),
          m = i * Math.tan((ae - Math.acos((d + h - g) / (2 * y * v))) / 2),
          _ = m / v,
          w = m / y;
        Math.abs(_ - 1) > 1e-6 &&
          (this._ += 'L' + (t + _ * c) + ',' + (n + _ * l)),
          (this._ +=
            'A' +
            i +
            ',' +
            i +
            ',0,0,' +
            +(l * f > c * p) +
            ',' +
            (this._x1 = t + w * u) +
            ',' +
            (this._y1 = n + w * s));
      } else this._ += 'L' + (this._x1 = t) + ',' + (this._y1 = n);
    else;
  },
  arc: function (t, n, e, r, i, o) {
    (t = +t), (n = +n), (o = !!o);
    var a = (e = +e) * Math.cos(r),
      u = e * Math.sin(r),
      s = t + a,
      c = n + u,
      l = 1 ^ o,
      h = o ? r - i : i - r;
    if (e < 0) throw new Error('negative radius: ' + e);
    null === this._x1
      ? (this._ += 'M' + s + ',' + c)
      : (Math.abs(this._x1 - s) > 1e-6 || Math.abs(this._y1 - c) > 1e-6) &&
        (this._ += 'L' + s + ',' + c),
      e &&
        (h < 0 && (h = (h % ue) + ue),
        h > se
          ? (this._ +=
              'A' +
              e +
              ',' +
              e +
              ',0,1,' +
              l +
              ',' +
              (t - a) +
              ',' +
              (n - u) +
              'A' +
              e +
              ',' +
              e +
              ',0,1,' +
              l +
              ',' +
              (this._x1 = s) +
              ',' +
              (this._y1 = c))
          : h > 1e-6 &&
            (this._ +=
              'A' +
              e +
              ',' +
              e +
              ',0,' +
              +(h >= ae) +
              ',' +
              l +
              ',' +
              (this._x1 = t + e * Math.cos(i)) +
              ',' +
              (this._y1 = n + e * Math.sin(i))));
  },
  rect: function (t, n, e, r) {
    this._ +=
      'M' +
      (this._x0 = this._x1 = +t) +
      ',' +
      (this._y0 = this._y1 = +n) +
      'h' +
      +e +
      'v' +
      +r +
      'h' +
      -e +
      'Z';
  },
  toString: function () {
    return this._;
  },
}),
  (fe.prototype = {
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
            this._line
              ? this._context.lineTo(t, n)
              : this._context.moveTo(t, n);
          break;
        case 1:
          this._point = 2;
        default:
          this._context.lineTo(t, n);
      }
    },
  });
var ye = { value: function () {} };
function ve() {
  for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
    if (!(t = arguments[n] + '') || t in r || /[\s.]/.test(t))
      throw new Error('illegal type: ' + t);
    r[t] = [];
  }
  return new me(r);
}
function me(t) {
  this._ = t;
}
function _e(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var e = '',
        r = t.indexOf('.');
      if (
        (r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))),
        t && !n.hasOwnProperty(t))
      )
        throw new Error('unknown type: ' + t);
      return { type: t, name: e };
    });
}
function we(t, n) {
  for (var e, r = 0, i = t.length; r < i; ++r)
    if ((e = t[r]).name === n) return e.value;
}
function xe(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = ye), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return null != e && t.push({ name: n, value: e }), t;
}
function be() {
  st.stopImmediatePropagation();
}
function Me() {
  st.preventDefault(), st.stopImmediatePropagation();
}
function ke(t) {
  var n = t.document.documentElement,
    e = wt(t).on('dragstart.drag', Me, !0);
  'onselectstart' in n
    ? e.on('selectstart.drag', Me, !0)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = 'none'));
}
function Ne(t) {
  return function () {
    return t;
  };
}
function Se(t, n, e, r, i, o, a, u, s, c) {
  (this.target = t),
    (this.type = n),
    (this.subject = e),
    (this.identifier = r),
    (this.active = i),
    (this.x = o),
    (this.y = a),
    (this.dx = u),
    (this.dy = s),
    (this._ = c);
}
function Ae() {
  return !st.ctrlKey && !st.button;
}
function Ee() {
  return this.parentNode;
}
function Pe(t) {
  return null == t ? { x: st.x, y: st.y } : t;
}
function Oe() {
  return navigator.maxTouchPoints || 'ontouchstart' in this;
}
function je() {
  var t,
    n,
    e,
    r,
    i = Ae,
    o = Ee,
    a = Pe,
    u = Oe,
    s = {},
    c = ve('start', 'drag', 'end'),
    l = 0,
    h = 0;
  function f(t) {
    t.on('mousedown.drag', p)
      .filter(u)
      .on('touchstart.drag', y)
      .on('touchmove.drag', v)
      .on('touchend.drag touchcancel.drag', m)
      .style('touch-action', 'none')
      .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
  }
  function p() {
    if (!r && i.apply(this, arguments)) {
      var a = _('mouse', o.apply(this, arguments), Mt, this, arguments);
      a &&
        (wt(st.view).on('mousemove.drag', d, !0).on('mouseup.drag', g, !0),
        ke(st.view),
        be(),
        (e = !1),
        (t = st.clientX),
        (n = st.clientY),
        a('start'));
    }
  }
  function d() {
    if ((Me(), !e)) {
      var r = st.clientX - t,
        i = st.clientY - n;
      e = r * r + i * i > h;
    }
    s.mouse('drag');
  }
  function g() {
    wt(st.view).on('mousemove.drag mouseup.drag', null),
      (function (t, n) {
        var e = t.document.documentElement,
          r = wt(t).on('dragstart.drag', null);
        n &&
          (r.on('click.drag', Me, !0),
          setTimeout(function () {
            r.on('click.drag', null);
          }, 0)),
          'onselectstart' in e
            ? r.on('selectstart.drag', null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
      })(st.view, e),
      Me(),
      s.mouse('end');
  }
  function y() {
    if (i.apply(this, arguments)) {
      var t,
        n,
        e = st.changedTouches,
        r = o.apply(this, arguments),
        a = e.length;
      for (t = 0; t < a; ++t)
        (n = _(e[t].identifier, r, kt, this, arguments)) && (be(), n('start'));
    }
  }
  function v() {
    var t,
      n,
      e = st.changedTouches,
      r = e.length;
    for (t = 0; t < r; ++t) (n = s[e[t].identifier]) && (Me(), n('drag'));
  }
  function m() {
    var t,
      n,
      e = st.changedTouches,
      i = e.length;
    for (
      r && clearTimeout(r),
        r = setTimeout(function () {
          r = null;
        }, 500),
        t = 0;
      t < i;
      ++t
    )
      (n = s[e[t].identifier]) && (be(), n('end'));
  }
  function _(t, n, e, r, i) {
    var o,
      u,
      h,
      p = e(n, t),
      d = c.copy();
    if (
      dt(new Se(f, 'beforestart', o, t, l, p[0], p[1], 0, 0, d), function () {
        return (
          null != (st.subject = o = a.apply(r, i)) &&
          ((u = o.x - p[0] || 0), (h = o.y - p[1] || 0), !0)
        );
      })
    )
      return function a(c) {
        var g,
          y = p;
        switch (c) {
          case 'start':
            (s[t] = a), (g = l++);
            break;
          case 'end':
            delete s[t], --l;
          case 'drag':
            (p = e(n, t)), (g = l);
        }
        dt(
          new Se(
            f,
            c,
            o,
            t,
            g,
            p[0] + u,
            p[1] + h,
            p[0] - y[0],
            p[1] - y[1],
            d
          ),
          d.apply,
          d,
          [c, r, i]
        );
      };
  }
  return (
    (f.filter = function (t) {
      return arguments.length
        ? ((i = 'function' == typeof t ? t : Ne(!!t)), f)
        : i;
    }),
    (f.container = function (t) {
      return arguments.length
        ? ((o = 'function' == typeof t ? t : Ne(t)), f)
        : o;
    }),
    (f.subject = function (t) {
      return arguments.length
        ? ((a = 'function' == typeof t ? t : Ne(t)), f)
        : a;
    }),
    (f.touchable = function (t) {
      return arguments.length
        ? ((u = 'function' == typeof t ? t : Ne(!!t)), f)
        : u;
    }),
    (f.on = function () {
      var t = c.on.apply(c, arguments);
      return t === c ? f : t;
    }),
    (f.clickDistance = function (t) {
      return arguments.length ? ((h = (t = +t) * t), f) : Math.sqrt(h);
    }),
    f
  );
}
(me.prototype = ve.prototype = {
  constructor: me,
  on: function (t, n) {
    var e,
      r = this._,
      i = _e(t + '', r),
      o = -1,
      a = i.length;
    if (!(arguments.length < 2)) {
      if (null != n && 'function' != typeof n)
        throw new Error('invalid callback: ' + n);
      for (; ++o < a; )
        if ((e = (t = i[o]).type)) r[e] = xe(r[e], t.name, n);
        else if (null == n) for (e in r) r[e] = xe(r[e], t.name, null);
      return this;
    }
    for (; ++o < a; )
      if ((e = (t = i[o]).type) && (e = we(r[e], t.name))) return e;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new me(t);
  },
  call: function (t, n) {
    if ((e = arguments.length - 2) > 0)
      for (var e, r, i = new Array(e), o = 0; o < e; ++o)
        i[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
    for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
}),
  (Se.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);
    return t === this._ ? this : t;
  });
var Te = function (t) {
    return 50 * Math.sin((Math.PI / 50) * t - 0.5 * Math.PI) + 50;
  },
  Ce = function (t) {
    return (25 * (2 * Math.asin((t - 50) / 50) + Math.PI)) / Math.PI;
  },
  Le = function (t) {
    return t >= 80 && t <= 100;
  },
  ze = function (t, n) {
    var e = t + 5;
    return Le(n) ? -1 * e : e;
  },
  De = {
    target: 'svg',
    width: 900,
    height: 300,
    preview: !1,
    margin: { top: 20, right: 20, bottom: 40, left: 20 },
  },
  qe = (function (n) {
    !(function (t, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      (t.prototype = Object.create(n && n.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        n && o(t, n);
    })(l, f);
    var e,
      i,
      u,
      c = s(l);
    function l(t, n) {
      var e;
      return (
        (function (t, n) {
          if (!(t instanceof n))
            throw new TypeError('Cannot call a class as a function');
        })(this, l),
        (e = c.call(this)),
        Object.assign(a(e), De, { data: t }, n),
        e.init(),
        e
      );
    }
    return (
      (e = l),
      (i = [
        {
          key: 'init',
          value: function () {
            var t = this.width,
              n = this.height,
              e = this.margin,
              r = this.target;
            (this.chartWidth = t - e.left - e.right),
              (this.chartHeight = n - e.top - e.bottom),
              (this.svg = wt(r)
                .attr('width', t)
                .attr('height', n)
                .append('g')
                .attr(
                  'transform',
                  'translate('.concat(e.left, ', ').concat(e.top, ')')
                )),
              (this.xScale = Zn().domain([0, 100]).range([0, this.chartWidth])),
              (this.yScale = Zn()
                .domain([0, 100])
                .range([this.chartHeight, 0])),
              this.normalizeData();
          },
        },
        {
          key: 'normalizeData',
          value: function () {
            this.data = this.data.map(function (t) {
              return {
                color: t.color,
                description: t.description,
                link: t.link,
                x: t.x ? t.x : 0,
                y: Te(t.y ? t.y : 0),
                size: t.size ? t.size : 10,
              };
            });
          },
        },
        {
          key: 'render',
          value: function () {
            var t = this;
            this.renderBottomLine(5),
              this.renderMainCurve(),
              this.renderMiddleLine(),
              this.renderFooterText();
            var n,
              e = this,
              i = je().on('drag', function (t) {
                var n = st.x;
                n < 0
                  ? ((n = 0),
                    e.emit(
                      'home',
                      r(r({}, t), {}, { y: Ce(e.yScale.invert(t.y)) })
                    ))
                  : n > e.chartWidth &&
                    ((n = e.chartWidth),
                    e.emit(
                      'end',
                      r(
                        r({}, t),
                        {},
                        {
                          x: e.xScale.invert(e.chartWidth),
                          y: Ce(e.yScale.invert(t.y)),
                        }
                      )
                    ));
                var i = e.xScale.invert(n);
                (t.x = n), (t.y = e.yScale(Te(i)));
                var o = Ce(e.yScale.invert(t.y)),
                  a = { x: i, y: o };
                wt(this).on('click', function () {
                  e.emit('pointClick', r(r({}, t), a));
                }),
                  e.preview ||
                    (wt(this)
                      .attr(
                        'transform',
                        'translate('.concat(t.x, ', ').concat(t.y, ')')
                      )
                      .select('text')
                      .style('text-anchor', function () {
                        return Le(i) ? 'end' : 'start';
                      })
                      .attr('x', function (t) {
                        return ze(t.size, i);
                      }),
                    e.emit('move', i, o),
                    e.emit('moved', r(r({}, t), a)));
              });
            (n = this.preview
              ? this.undraggablePoint()
              : this.svg
                  .selectAll('.hill-chart-group')
                  .data(this.data)
                  .enter()
                  .append('g')
                  .attr('class', 'hill-chart-group')
                  .attr('transform', function (n) {
                    return (
                      (n.x = t.xScale(n.x)),
                      (n.y = t.yScale(n.y)),
                      'translate('.concat(n.x, ', ').concat(n.y, ')')
                    );
                  })
                  .call(i))
              .append('circle')
              .attr('class', 'hill-chart-circle')
              .attr('fill', function (t) {
                return t.color;
              })
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', function (t) {
                return t.size;
              }),
              n
                .append('text')
                .text(function (t) {
                  return t.description;
                })
                .attr('x', function (n) {
                  return ze(n.size, t.xScale.invert(n.x));
                })
                .style('text-anchor', function (n) {
                  return Le(t.xScale.invert(n.x)) ? 'end' : 'start';
                })
                .attr('y', 5);
          },
        },
        {
          key: 'undraggablePoint',
          value: function () {
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
          },
        },
        {
          key: 'renderMainCurve',
          value: function () {
            var t = this;
            (this.mainLineCurvePoints = (function (t, n, e) {
              (t = +t),
                (n = +n),
                (e =
                  (i = arguments.length) < 2
                    ? ((n = t), (t = 0), 1)
                    : i < 3
                    ? 1
                    : +e);
              for (
                var r = -1,
                  i = 0 | Math.max(0, Math.ceil((n - t) / e)),
                  o = new Array(i);
                ++r < i;

              )
                o[r] = t + r * e;
              return o;
            })(0, 100, 0.1).map(function (t) {
              return { x: t, y: Te(t) };
            })),
              (this.line = (function () {
                var t = de,
                  n = ge,
                  e = he(!0),
                  r = null,
                  i = pe,
                  o = null;
                function a(a) {
                  var u,
                    s,
                    c,
                    l = a.length,
                    h = !1;
                  for (null == r && (o = i((c = le()))), u = 0; u <= l; ++u)
                    !(u < l && e((s = a[u]), u, a)) === h &&
                      ((h = !h) ? o.lineStart() : o.lineEnd()),
                      h && o.point(+t(s, u, a), +n(s, u, a));
                  if (c) return (o = null), c + '' || null;
                }
                return (
                  (a.x = function (n) {
                    return arguments.length
                      ? ((t = 'function' == typeof n ? n : he(+n)), a)
                      : t;
                  }),
                  (a.y = function (t) {
                    return arguments.length
                      ? ((n = 'function' == typeof t ? t : he(+t)), a)
                      : n;
                  }),
                  (a.defined = function (t) {
                    return arguments.length
                      ? ((e = 'function' == typeof t ? t : he(!!t)), a)
                      : e;
                  }),
                  (a.curve = function (t) {
                    return arguments.length
                      ? ((i = t), null != r && (o = i(r)), a)
                      : i;
                  }),
                  (a.context = function (t) {
                    return arguments.length
                      ? (null == t ? (r = o = null) : (o = i((r = t))), a)
                      : r;
                  }),
                  a
                );
              })()
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
          },
        },
        {
          key: 'renderBottomLine',
          value: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 5;
            (this.bottomLine = oe(this.xScale).ticks(0).tickSize(0)),
              this.svg
                .append('g')
                .attr('class', 'hill-chart-bottom-line')
                .attr(
                  'transform',
                  'translate(0, '.concat(this.chartHeight + t, ')')
                )
                .call(this.bottomLine);
          },
        },
        {
          key: 'renderMiddleLine',
          value: function () {
            this.svg
              .append('line')
              .attr('class', 'hill-chart-middle-line')
              .attr('y1', this.yScale(0))
              .attr('y2', this.yScale(100))
              .attr('x2', this.xScale(50))
              .attr('x1', this.xScale(50));
          },
        },
        {
          key: 'renderFooterText',
          value: function () {
            this.svg
              .append('text')
              .attr('class', 'hill-chart-text')
              .text('Figuring things out')
              .attr('x', this.xScale(25))
              .attr('y', this.chartHeight + 25),
              this.svg
                .append('text')
                .attr('class', 'hill-chart-text')
                .text('Making it happen')
                .attr('x', this.xScale(75))
                .attr('y', this.chartHeight + 25);
          },
        },
      ]) && t(e.prototype, i),
      u && t(e, u),
      l
    );
  })();
export default qe;
