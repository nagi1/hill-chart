import EventEmitter from 'event-emitter-es6';
import {
  select,
  event,
  scaleLinear,
  axisBottom,
  line,
  drag,
  range,
} from './d3';
import {
  hillFn,
  hillFnInverse,
  textOutRange,
  calculateTextPositionForX,
  calculateTextMarginForY,
  uId,
} from './helpers';
import './styles.css';

const defaults = {
  target: 'svg',
  width: 900,
  height: 300,
  preview: false,
  darkMode: false,
  backgroundColor: 'transparent',
  footerText: {
    show: true,
    fontSize: 0.75,
  },
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
    const colorScheme = this.darkMode ? 'hill-chart-dark' : 'hill-chart-light';
    const defaultBg = this.darkMode ? '#2f3437' : '#ffffff';
    const useDefaultBg = this.backgroundColor === true;
    const useTransparentBg = this.backgroundColor === false;
    const suppliedBgColor = useDefaultBg ? defaultBg : this.backgroundColor;
    const backgroundColor = useTransparentBg ? 'transparent' : suppliedBgColor;

    this.svg = select(target)
      .attr('class', colorScheme)
      .attr('width', width)
      .attr('height', height)
      .attr('style', `stroke-width: 0; background-color: ${backgroundColor};`)
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
        id: point.id ? point.id : uId(),
        color: point.color,
        description: point.description,
        link: point.link,
        x: point.x ? point.x : 0,
        y: point.y ? point.y : hillFn(point.x ? point.x : 0),
        size: point.size ? point.size : 10,
      };
    });
  }

  // Replace the data points
  replaceData(data) {
    // Update and normalize the data
    Object.assign(this, { data });
    this.normalizeData();
  }

  // Replace the data points, and re-render the group
  replaceAndUpdate(data) {
    // Update and normalize the data
    this.replaceData(data);

    // Remove the existing points
    this.svg.selectAll('.hill-chart-group').remove();

    // Render group of points
    this.renderGroup();
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
        data.x = this.xScale(data.x);
        data.y = this.yScale(data.y);
        return `translate(${data.x}, ${data.y})`;
      });
  }

  render() {
    // Render the horizontal bottom line on X axis
    this.renderBottomLine(5);

    // Render the main curve line
    this.renderMainCurve();

    // Render the line in the middle
    this.renderMiddleLine();

    if (this.footerText.show) {
      // Render the text on the footer
      this.renderFooterText();
    }

    // Render the group on the chart
    this.renderGroup();
  }

  renderGroup() {
    const that = this;

    // Handle dragging
    const dragPoint = drag().on('drag', function (data) {
      let { x } = event;

      // Check point movement, preventing it from wondering outside the main curve
      if (x < 0) {
        x = 0;
        that.emit('home', {
          ...data,
          y: hillFnInverse(that.yScale.invert(data.y)),
        });
      } else if (x > that.chartWidth) {
        x = that.chartWidth;
        that.emit('end', {
          ...data,
          x: that.xScale.invert(that.chartWidth),
          y: hillFnInverse(that.yScale.invert(data.y)),
        });
      }

      // Convert current point coordinates back to the original
      // between 0 and 100 to set it in the data attribute
      const invertedX = that.xScale.invert(x);

      data.x = x;

      data.y = that.yScale(hillFn(invertedX));

      const invertedY = hillFnInverse(that.yScale.invert(data.y));

      const newInvertedCoordinates = {
        x: invertedX,
        y: invertedY,
      };

      // click event
      select(this).on('click', () => {
        that.emit('pointClick', { ...data, ...newInvertedCoordinates });
      });

      if (!that.preview) {
        const selectedPoint = select(this).attr(
          'transform',
          `translate(${data.x}, ${data.y})`
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
            calculateTextPositionForX(point.size, invertedX)
          );

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
          data.x = this.xScale(data.x);
          data.y = this.yScale(data.y);
          return `translate(${data.x}, ${data.y})`;
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
        calculateTextPositionForX(data.size, this.xScale.invert(data.x))
      )
      .style('text-anchor', (data) => {
        if (textOutRange(this.xScale.invert(data.x))) {
          return 'end';
        }
        return 'start';
      })
      .attr('y', calculateTextMarginForY());
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
      .style('font-size', `${this.footerText.fontSize}rem`)
      .attr('x', this.xScale(25))
      .attr('y', this.chartHeight + 30);

    this.svg
      .append('text')
      .attr('class', 'hill-chart-text')
      .text('Making it happen')
      .style('font-size', `${this.footerText.fontSize}rem`)
      .attr('x', this.xScale(75))
      .attr('y', this.chartHeight + 30);
  }
}
