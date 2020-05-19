!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e(
        require('d3-selection'),
        require('d3-scale'),
        require('d3-axis'),
        require('d3-shape'),
        require('d3-drag'),
        require('d3-array')
      ))
    : 'function' == typeof define && define.amd
    ? define([
        'd3-selection',
        'd3-scale',
        'd3-axis',
        'd3-shape',
        'd3-drag',
        'd3-array',
      ], e)
    : ((t = t || self).HillChart = e(t.d3, t.d3, t.d3, t.d3, t.d3, t.d3));
})(this, function (t, e, n, r, i, a) {
  'use strict';
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function c(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function s(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function l(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? s(Object(n), !0).forEach(function (e) {
            c(t, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : s(Object(n)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
          });
    }
    return t;
  }
  function u(t) {
    return (u = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function h(t, e) {
    return (h =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function f(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function p(t, e) {
    return !e || ('object' != typeof e && 'function' != typeof e) ? f(t) : e;
  }
  function d(t) {
    var e = (function () {
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
      var n,
        r = u(t);
      if (e) {
        var i = u(this).constructor;
        n = Reflect.construct(r, arguments, i);
      } else n = r.apply(this, arguments);
      return p(this, n);
    };
  }
  var y = (function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    return function (e, n, r) {
      return n && t(e.prototype, n), r && t(e, r), e;
    };
  })();
  function v(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  var g = { emitDelay: 10, strictMode: !1 },
    m = (function () {
      function t() {
        var e =
          arguments.length <= 0 || void 0 === arguments[0] ? g : arguments[0];
        v(this, t);
        var n = void 0,
          r = void 0;
        (n = e.hasOwnProperty('emitDelay') ? e.emitDelay : g.emitDelay),
          (this._emitDelay = n),
          (r = e.hasOwnProperty('strictMode') ? e.strictMode : g.strictMode),
          (this._strictMode = r),
          (this._listeners = {}),
          (this.events = []);
      }
      return (
        y(t, [
          {
            key: '_addListenner',
            value: function (t, e, n) {
              if ('function' != typeof e)
                throw TypeError('listener must be a function');
              -1 === this.events.indexOf(t)
                ? ((this._listeners[t] = [{ once: n, fn: e }]),
                  this.events.push(t))
                : this._listeners[t].push({ once: n, fn: e });
            },
          },
          {
            key: 'on',
            value: function (t, e) {
              this._addListenner(t, e, !1);
            },
          },
          {
            key: 'once',
            value: function (t, e) {
              this._addListenner(t, e, !0);
            },
          },
          {
            key: 'off',
            value: function (t, e) {
              var n,
                r,
                i = this,
                a = this.events.indexOf(t);
              t &&
                -1 !== a &&
                (e
                  ? ((n = []),
                    (r = i._listeners[t]).forEach(function (t, r) {
                      t.fn === e && n.unshift(r);
                    }),
                    n.forEach(function (t) {
                      r.splice(t, 1);
                    }),
                    r.length || (i.events.splice(a, 1), delete i._listeners[t]))
                  : (delete this._listeners[t], this.events.splice(a, 1)));
            },
          },
          {
            key: '_applyEvents',
            value: function (t, e) {
              var n = this._listeners[t];
              if (n && n.length) {
                var r = [];
                n.forEach(function (t, n) {
                  t.fn.apply(null, e), t.once && r.unshift(n);
                }),
                  r.forEach(function (t) {
                    n.splice(t, 1);
                  });
              } else if (this._strictMode)
                throw 'No listeners specified for event: ' + t;
            },
          },
          {
            key: 'emit',
            value: function (t) {
              for (
                var e = this,
                  n = arguments.length,
                  r = Array(n > 1 ? n - 1 : 0),
                  i = 1;
                i < n;
                i++
              )
                r[i - 1] = arguments[i];
              this._emitDelay
                ? setTimeout(function () {
                    e._applyEvents.call(e, t, r);
                  }, this._emitDelay)
                : this._applyEvents(t, r);
            },
          },
          {
            key: 'emitSync',
            value: function (t) {
              for (
                var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1;
                r < e;
                r++
              )
                n[r - 1] = arguments[r];
              this._applyEvents(t, n);
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
    x = function (t) {
      return 50 * Math.sin((Math.PI / 50) * t - 0.5 * Math.PI) + 50;
    },
    b = function (t) {
      return t >= 80 && t <= 100;
    },
    O = function (t, e) {
      var n = t + 5;
      return b(e) ? -1 * n : n;
    },
    k = {
      target: 'svg',
      width: 900,
      height: 300,
      preview: !1,
      margin: { top: 20, right: 20, bottom: 40, left: 20 },
    };
  return (function (c) {
    !(function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && h(t, e);
    })(v, c);
    var s,
      u,
      p,
      y = d(v);
    function v(t, e) {
      var n;
      return (
        (function (t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function');
        })(this, v),
        (n = y.call(this)),
        Object.assign(f(n), k, { data: t }, e),
        n.init(),
        n
      );
    }
    return (
      (s = v),
      (u = [
        {
          key: 'init',
          value: function () {
            var n = this.width,
              r = this.height,
              i = this.margin,
              a = this.target;
            (this.chartWidth = n - i.left - i.right),
              (this.chartHeight = r - i.top - i.bottom),
              (this.svg = t
                .select(a)
                .attr('width', n)
                .attr('height', r)
                .append('g')
                .attr(
                  'transform',
                  'translate('.concat(i.left, ', ').concat(i.top, ')')
                )),
              (this.xScale = e
                .scaleLinear()
                .domain([0, 100])
                .range([0, this.chartWidth])),
              (this.yScale = e
                .scaleLinear()
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
                x: t.x,
                y: x(t.y),
                size: t.size ? t.size : 10,
              };
            });
          },
        },
        {
          key: 'render',
          value: function () {
            var e = this;
            this.renderBottomLine(5),
              this.renderMainCurve(),
              this.renderMiddleLine(),
              this.renderFooterText();
            var n,
              r = this,
              a = i.drag().on('drag', function (e) {
                var n,
                  i = t.event.x;
                if (
                  (i < 0
                    ? (r.emit('home', e), (i = 0))
                    : i > r.chartWidth &&
                      ((i = r.chartWidth), r.emit('end', e)),
                  !r.preview)
                ) {
                  var a = r.xScale.invert(i);
                  (e.x = i), (e.y = r.yScale(x(a)));
                  var o =
                      ((n = r.yScale.invert(e.y)),
                      (25 * (2 * Math.asin((n - 50) / 50) + Math.PI)) /
                        Math.PI),
                    c = { x: a, y: o },
                    s = t
                      .select(this)
                      .attr(
                        'transform',
                        'translate('.concat(e.x, ', ').concat(e.y, ')')
                      );
                  s
                    .select('text')
                    .style('text-anchor', function () {
                      return b(a) ? 'end' : 'start';
                    })
                    .attr('x', function (t) {
                      return O(t.size, a);
                    }),
                    s.on('click', function () {
                      r.emit('PointClick', e);
                    }),
                    r.emit('move', a, o),
                    r.emit('moved', l(l({}, e), c));
                }
              });
            (n = this.preview
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
                  .call(a))
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
                .attr('x', function (t) {
                  return O(t.size, e.xScale.invert(t.x));
                })
                .style('text-anchor', function (t) {
                  return b(e.xScale.invert(t.x)) ? 'end' : 'start';
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
              .attr('transform', function (e) {
                return (
                  (e.x = t.xScale(e.x)),
                  (e.y = t.yScale(e.y)),
                  'translate('.concat(e.x, ', ').concat(e.y, ')')
                );
              });
          },
        },
        {
          key: 'renderMainCurve',
          value: function () {
            var t = this;
            (this.mainLineCurvePoints = a.range(0, 100, 0.1).map(function (t) {
              return { x: t, y: x(t) };
            })),
              (this.line = r
                .line()
                .x(function (e) {
                  return t.xScale(e.x);
                })
                .y(function (e) {
                  return t.yScale(e.y);
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
            (this.bottomLine = n.axisBottom(this.xScale).ticks(0).tickSize(0)),
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
      ]) && o(s.prototype, u),
      p && o(s, p),
      v
    );
  })(m);
});
