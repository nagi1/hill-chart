import { select, event } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { line } from 'd3-shape';
import { drag } from 'd3-drag';
import { range } from 'd3-array';
import EventEmitter from 'event-emitter-es6';
import './styles.css';

// Some math magic of the function responsible for produce
// hill-like curve and, correctly position and drag
// points on the Y axis
const hillFn = (point) =>
  50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;

// The inverse of the same magic to convert back values from
// chart back to the original before hillFn(). mainly used
// in dragging event and setting the setting new values.
const hillFnInverse = (point) =>
  (25 * (2 * Math.asin((point - 50) / 50) + Math.PI)) / Math.PI;

// Calculate when the point is just near to the right side of the chart
const textOutRange = (x) => x >= 80 && x <= 100;

const calculateTextPositionForX = (size, x) => {
  const margin = size + 5;
  return textOutRange(x) ? -1 * margin : margin;
};

const calculateTextMarginForY = () => 5;

const defaults = {
  target: 'svg',
  width: 900,
  height: 300,
  preview: false,
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 20,
  },
};

export default class HillChart extends EventEmitter {
  constructor(data, config) {
    super();
    Object.assign(this, defaults, { data }, config);
    this.init();
  }

  init() {
    const { width, height, margin, target } = this;

    // Calculate real chart dimensions without the margins
    this.chartWidth = width - margin.left - margin.right;
    this.chartHeight = height - margin.top - margin.bottom;

    // Render the svg and center chart according to margins
    this.svg = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Set X and Y axis scale values, it used to determine the center of the chart
    // when calling this.xScale(50), it also flip the y axis to start from the
    // lowest point and scale up like claiming a hill from the ground.
    this.xScale = scaleLinear().domain([0, 100]).range([0, this.chartWidth]);
    this.yScale = scaleLinear().domain([0, 100]).range([this.chartHeight, 0]);

    // Normalize data on the y axis
    this.normalizeData();
  }

  normalizeData() {
    this.data = this.data.map((point) => {
      return {
        color: point.color,
        description: point.description,
        link: point.link,
        x: point.x,
        y: hillFn(point.y),
        size: point.size ? point.size : 10,
      };
    });
  }

  render() {
    // Render the horizontal bottom line on X axis
    this.renderBottomLine(5);

    // Render the main curve line
    this.renderMainCurve();

    // Render the line in the middle
    this.renderMiddleLine();

    // Render the text on the footer
    this.renderFooterText();

    // Get copy of the instance to use inside in dragging callback
    const that = this;

    // Handle dragging
    const dragPoint = drag().on('drag', (data) => {
      let { x } = event;
      // Check point movement, preventing it from wondering outside the main curve
      if (x < 0) {
        that.emit('home', data);
        x = 0;
      } else if (x > that.chartWidth) {
        x = that.chartWidth;
        that.emit('end', data);
      }

      if (!that.preview) {
        // Convert current point coordinates back to the original
        // between 0 and 100 to set it in the data attribute
        const invertedX = that.xScale.invert(x);

        const y = that.yScale(hillFn(invertedX));

        const invertedY = hillFnInverse(that.yScale.invert(y));

        const newInvertedCoordinates = {
          x: invertedX,
          y: invertedY,
        };

        const selectedPoint = select(this).attr(
          'transform',
          `translate(${x}, ${y})`,
        );
        selectedPoint
          .select('text')
          .style('text-anchor', () => {
            if (textOutRange(invertedX)) {
              return 'end';
            }
            return 'start';
          })
          .attr('x', (point) =>
            calculateTextPositionForX(point.size, invertedX),
          );

        selectedPoint.on('click', () => {
          that.emit('click', data);
        });
        that.emit('move', invertedX, invertedY);
        that.emit('moved', { ...data, ...newInvertedCoordinates });
      }
    });

    let group;

    if (this.preview) {
      group = this.undraggablePoint();
    } else {
      // Create group consisted of a circle and a description text, where
      // the data attributes determine the position of them on the curve
      group = this.svg
        .selectAll('.hill-chart-group')
        .data(this.data)
        .enter()
        .append('g')
        .attr('class', 'hill-chart-group')
        .attr('transform', (data) => {
          const x = this.xScale(data.x);
          const y = this.yScale(data.y);
          return `translate(${x}, ${y})`;
        })
        .call(dragPoint);
    }

    group
      .append('circle')
      .attr('class', 'hill-chart-circle')
      .attr('fill', (data) => data.color)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', (data) => data.size);

    group
      .append('text')
      .text((data) => data.description)
      .attr('x', (data) =>
        calculateTextPositionForX(data.size, this.xScale.invert(data.x)),
      )
      .style('text-anchor', (data) => {
        if (textOutRange(this.xScale.invert(data.x))) {
          return 'end';
        }
        return 'start';
      })
      .attr('y', calculateTextMarginForY());
  }

  undraggablePoint() {
    return this.svg
      .selectAll('.hill-chart-group')
      .data(this.data)
      .enter()
      .append('a')
      .attr('href', (data) => (data.link ? data.link : '#'))
      .append('g')
      .attr('class', 'hill-chart-group')
      .style('cursor', 'pointer')
      .attr('transform', (data) => {
        const x = this.xScale(data.x);
        const y = this.yScale(data.y);
        return `translate(${x}, ${y})`;
      });
  }

  renderMainCurve() {
    // Generate the main line curve points
    this.mainLineCurvePoints = range(0, 100, 0.1).map((i) => ({
      x: i,
      y: hillFn(i),
    }));

    // Map main line curve points to <svg> d attribute
    this.line = line()
      .x((d) => this.xScale(d.x))
      .y((d) => this.yScale(d.y));

    // Render the actual main line curve
    this.svg
      .append('path')
      .attr('class', 'chart-hill-main-curve')
      .datum(this.mainLineCurvePoints)
      .attr('d', this.line);
  }

  renderBottomLine(marginTop = 5) {
    // Generate the horizontal bottom line on the X axis
    this.bottomLine = axisBottom(this.xScale).ticks(0).tickSize(0);

    // Render the acutal svg
    this.svg
      .append('g')
      .attr('class', 'hill-chart-bottom-line')
      .attr('transform', `translate(0, ${this.chartHeight + marginTop})`)
      .call(this.bottomLine);
  }

  renderMiddleLine() {
    this.svg
      .append('line')
      .attr('class', 'hill-chart-middle-line')
      .attr('y1', this.yScale(0))
      .attr('y2', this.yScale(100))
      .attr('x2', this.xScale(50))
      .attr('x1', this.xScale(50));
  }

  renderFooterText() {
    this.svg
      .append('text')
      .attr('class', 'hill-chart-text')
      .text('Figuring things out')
      .attr('x', this.xScale(25))
      .attr('y', this.chartHeight + 25);

    this.svg
      .append('text')
      .attr('class', 'hill-chart-text')
      .text('Making it happen')
      .attr('x', this.xScale(75))
      .attr('y', this.chartHeight + 25);
  }
}
