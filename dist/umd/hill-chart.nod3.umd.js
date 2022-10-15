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
    ? define(
        [
          'd3-selection',
          'd3-scale',
          'd3-axis',
          'd3-shape',
          'd3-drag',
          'd3-array',
        ],
        e
      )
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).HillChart =
        e(t.d3, t.d3, t.d3, t.d3, t.d3, t.d3));
})(this, function (t, e, r, i, n, a) {
  'use strict';
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
    ***************************************************************************** */ var o =
    function (t, e) {
      return (
        (o =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
          }),
        o(t, e)
      );
    };
  var s = function () {
      return (
        (s =
          Object.assign ||
          function (t) {
            for (var e, r = 1, i = arguments.length; r < i; r++)
              for (var n in (e = arguments[r]))
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t;
          }),
        s.apply(this, arguments)
      );
    },
    c = (function () {
      function t(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, r, i) {
        return r && t(e.prototype, r), i && t(e, i), e;
      };
    })();
  function l(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  var h = { emitDelay: 10, strictMode: !1 },
    u = (function () {
      function t() {
        var e =
          arguments.length <= 0 || void 0 === arguments[0] ? h : arguments[0];
        l(this, t);
        var r = void 0,
          i = void 0;
        (r = e.hasOwnProperty('emitDelay') ? e.emitDelay : h.emitDelay),
          (this._emitDelay = r),
          (i = e.hasOwnProperty('strictMode') ? e.strictMode : h.strictMode),
          (this._strictMode = i),
          (this._listeners = {}),
          (this.events = []);
      }
      return (
        c(t, [
          {
            key: '_addListenner',
            value: function (t, e, r) {
              if ('function' != typeof e)
                throw TypeError('listener must be a function');
              -1 === this.events.indexOf(t)
                ? ((this._listeners[t] = [{ once: r, fn: e }]),
                  this.events.push(t))
                : this._listeners[t].push({ once: r, fn: e });
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
              var r,
                i,
                n = this,
                a = this.events.indexOf(t);
              t &&
                -1 !== a &&
                (e
                  ? ((r = []),
                    (i = n._listeners[t]).forEach(function (t, i) {
                      t.fn === e && r.unshift(i);
                    }),
                    r.forEach(function (t) {
                      i.splice(t, 1);
                    }),
                    i.length || (n.events.splice(a, 1), delete n._listeners[t]))
                  : (delete this._listeners[t], this.events.splice(a, 1)));
            },
          },
          {
            key: '_applyEvents',
            value: function (t, e) {
              var r = this._listeners[t];
              if (r && r.length) {
                var i = [];
                r.forEach(function (t, r) {
                  t.fn.apply(null, e), t.once && i.unshift(r);
                }),
                  i.forEach(function (t) {
                    r.splice(t, 1);
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
                  r = arguments.length,
                  i = Array(r > 1 ? r - 1 : 0),
                  n = 1;
                n < r;
                n++
              )
                i[n - 1] = arguments[n];
              this._emitDelay
                ? setTimeout(function () {
                    e._applyEvents.call(e, t, i);
                  }, this._emitDelay)
                : this._applyEvents(t, i);
            },
          },
          {
            key: 'emitSync',
            value: function (t) {
              for (
                var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1;
                i < e;
                i++
              )
                r[i - 1] = arguments[i];
              this._applyEvents(t, r);
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
    d = function (t) {
      return 50 * Math.sin((Math.PI / 50) * t - 0.5 * Math.PI) + 50;
    },
    f = function (t) {
      return (25 * (2 * Math.asin((t - 50) / 50) + Math.PI)) / Math.PI;
    },
    p = function (t) {
      return t >= 80 && t <= 100;
    },
    y = function (t, e) {
      var r = t + 5;
      return p(e) ? -1 * r : r;
    },
    v = {
      target: 'svg',
      width: 900,
      height: 300,
      preview: !1,
      darkMode: !1,
      backgroundColor: 'transparent',
      footerText: { show: !0, fontSize: 0.75 },
      margin: { top: 20, right: 20, bottom: 40, left: 20 },
    };
  return (function (c) {
    function l(n, a) {
      var o = c.call(this) || this;
      return (
        (o.data = []),
        (o.target = v.target),
        (o.width = v.width),
        (o.height = v.height),
        (o.preview = v.preview),
        (o.darkMode = v.darkMode),
        (o.backgroundColor = v.backgroundColor),
        (o.footerText = v.footerText),
        (o.margin = v.margin),
        (o.chartWidth = 0),
        (o.chartHeight = 0),
        (o.colorScheme = 'hill-chart-light'),
        (o.svg = t.select('svg')),
        (o.xScale = e.scaleLinear()),
        (o.yScale = e.scaleLinear()),
        (o.bottomLine = r.axisBottom(o.xScale)),
        (o.mainLineCurvePoints = []),
        (o.line = i.line().x(0).y(0)),
        Object.assign(o, v, { data: n }, a),
        o.init(),
        o
      );
    }
    return (
      (function (t, e) {
        function r() {
          this.constructor = t;
        }
        o(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      })(l, c),
      (l.prototype.init = function () {
        var r = this,
          i = r.width,
          n = r.height,
          a = r.margin,
          o = r.target;
        (this.chartWidth = i - a.left - a.right),
          (this.chartHeight = n - a.top - a.bottom),
          (this.colorScheme = this.darkMode
            ? 'hill-chart-dark'
            : 'hill-chart-light');
        var s = this.darkMode ? '#2f3437' : '#ffffff',
          c = this.backgroundColor,
          l = !0 === c || void 0 === c,
          h = !1 === this.backgroundColor,
          u = l ? s : this.backgroundColor;
        (this.backgroundColor = h ? 'transparent' : u),
          (this.svg = t
            .select(o)
            .attr('class', this.colorScheme)
            .attr('width', i)
            .attr('height', n)
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
              'translate('.concat(a.left, ', ').concat(a.top, ')')
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
      }),
      (l.prototype.normalizeData = function () {
        this.data = this.data.map(function (t) {
          return {
            id: t.id ? t.id : Math.random().toString(36).slice(-6),
            color: t.color,
            description: t.description,
            link: t.link,
            x: t.x ? t.x : 0,
            y: t.y ? t.y : d(t.x ? t.x : 0),
            size: t.size ? t.size : 10,
          };
        });
      }),
      (l.prototype.replaceData = function (t) {
        Object.assign(this, { data: t }), this.normalizeData();
      }),
      (l.prototype.replaceAndUpdate = function (t) {
        this.replaceData(t),
          this.svg.selectAll('.hill-chart-group').remove(),
          this.renderGroup();
      }),
      (l.prototype.undraggablePoint = function () {
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
      }),
      (l.prototype.render = function () {
        this.renderBottomLine(5),
          this.renderMainCurve(),
          this.renderMiddleLine(),
          this.footerText.show && this.renderFooterText(),
          this.renderGroup();
      }),
      (l.prototype.renderGroup = function () {
        var e,
          r = this,
          i = this,
          a = n
            .drag()
            .on('drag', function (e) {
              var r = t.event.x;
              !r || r < 0
                ? ((r = 0),
                  i.emit('home', s(s({}, e), { y: f(i.yScale.invert(e.y)) })))
                : r > i.chartWidth &&
                  ((r = i.chartWidth),
                  i.emit(
                    'end',
                    s(s({}, e), {
                      x: i.xScale.invert(i.chartWidth),
                      y: f(i.yScale.invert(e.y)),
                    })
                  ));
              var n = i.xScale.invert(r);
              (e.x = r), (e.y = i.yScale(d(n)));
              var a = f(i.yScale.invert(e.y)),
                o = { x: n, y: a };
              (t.select(this).on('click', function () {
                i.emit('pointClick', s(s({}, e), o));
              }),
              i.preview) ||
                (t
                  .select(this)
                  .attr(
                    'transform',
                    'translate('.concat(e.x, ', ').concat(e.y, ')')
                  )
                  .select('text')
                  .style('text-anchor', function () {
                    return p(n) ? 'end' : 'start';
                  })
                  .attr('x', function (t) {
                    return y(t.size, n);
                  }),
                i.emit('move', n, a));
            })
            .on('end', function (e) {
              if (!r.preview) {
                var i = t.event.x;
                !i || i < 0 ? (i = 0) : i > r.chartWidth && (i = r.chartWidth);
                var n = r.xScale.invert(i);
                e.y = r.yScale(d(n));
                var a = { x: n, y: f(r.yScale.invert(e.y)) };
                r.emit('moved', s(s({}, e), a));
              }
            });
        (e = this.preview
          ? this.undraggablePoint()
          : this.svg
              .selectAll('.hill-chart-group')
              .data(this.data)
              .enter()
              .append('g')
              .attr('class', 'hill-chart-group')
              .attr('transform', function (t) {
                return (
                  (t.x = r.xScale(t.x)),
                  (t.y = r.yScale(t.y)),
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
            return t.size || 10;
          }),
          e
            .append('text')
            .text(function (t) {
              return t.description;
            })
            .attr('x', function (t) {
              return y(t.size || 10, r.xScale.invert(t.x));
            })
            .style('text-anchor', function (t) {
              return p(r.xScale.invert(t.x)) ? 'end' : 'start';
            })
            .attr('y', 5);
      }),
      (l.prototype.renderMainCurve = function () {
        var t = this;
        (this.mainLineCurvePoints = a.range(0, 100, 0.1).map(function (t) {
          return { x: t, y: d(t) };
        })),
          (this.line = i
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
      }),
      (l.prototype.renderBottomLine = function (t) {
        void 0 === t && (t = 5),
          (this.bottomLine = r.axisBottom(this.xScale).ticks(0).tickSize(0)),
          this.svg
            .append('g')
            .attr('class', 'hill-chart-bottom-line')
            .attr(
              'transform',
              'translate(0, '.concat(this.chartHeight + t, ')')
            )
            .call(this.bottomLine);
      }),
      (l.prototype.renderMiddleLine = function () {
        this.svg
          .append('line')
          .attr('class', 'hill-chart-middle-line')
          .attr('y1', this.yScale(0))
          .attr('y2', this.yScale(100))
          .attr('x2', this.xScale(50))
          .attr('x1', this.xScale(50));
      }),
      (l.prototype.renderFooterText = function () {
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
      l
    );
  })(u);
});
