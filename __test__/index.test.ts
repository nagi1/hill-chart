import HillChart from '../src/index';
import { hillFn } from '../src/helpers';
import { Config, Data } from '../src/types';

let svg: SVGSVGElement;
let config: Config;
let data: Data;
let replacementData: {
  color: string;
  description: string;
  x: number;
}[];

beforeEach(() => {
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  config = {
    target: svg,
    width: 900,
    height: 270,
    preview: false,
    darkMode: false,
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
  data = [
    {
      id: '1',
      color: 'red',
      description: 'Late af task',
      size: 10,
      x: 12.069770990416055,
      link: '/fired.html',
    },
    {
      id: '2',
      color: 'yellow',
      description: 'Gettin there',
      size: 10,
      x: 55.11627906976744,
      y: 44.88372093023257,
    },
    {
      id: '3',
      color: 'green',
      description: 'Hell yeah!',
      x: 93.48837209302326,
      size: 10,
    },
  ];
  replacementData = [
    {
      color: 'black',
      description: 'Another one',
      x: 0,
    },
    {
      color: 'purple',
      description: 'For you',
      x: 60,
    },
    {
      color: 'goldenrod',
      description: 'To complete',
      x: 100,
    },
  ];
});

function setupHillChart() {
  return new HillChart(data, config);
}

describe('hillchart@init', () => {
  it('normalizes data by plugging x on provided data to hillfn', () => {
    const hill = setupHillChart();
    hill.data.forEach((point, index) => {
      if (typeof data[index].y === 'undefined') {
        expect(point.y).toEqual(hillFn(data[index].x || 0));
      }
    });
  });

  it('uses the supplied y value if defined', () => {
    const hill = setupHillChart();
    hill.data.forEach((point, index) => {
      if (typeof data[index].y !== 'undefined') {
        expect(point.y).toEqual(data[index].y);
      }
    });
  });

  it('normalizes data by providing default point size of 10', () => {
    data = data.map((d) => {
      delete d.size;
      return d;
    });
    const hill = setupHillChart();
    hill.data.forEach((point) => {
      expect(point.size).toBe(10);
    });
  });

  it('sets random id per point if is not provided', () => {
    const hill = setupHillChart();

    const pointIds = hill.data.map((point) => point.id);
    const isArrayUnique = (arr: string[]) =>
      Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(isArrayUnique(pointIds)).toBe(true);
  });

  it('renders the svg and center the chart according to margins', () => {
    setupHillChart();
    expect(svg.getAttribute('height')).toEqual(config.height?.toString());
    expect(svg.getAttribute('width')).toEqual(config.width?.toString());
    expect(svg.querySelector('g')?.getAttribute('transform')).toBe(
      `translate(${config.margin?.left}, ${config.margin?.top})`
    );
  });

  it('defaults to a transparent background', () => {
    setupHillChart();
    expect(svg.getAttribute('style')).toBe(
      'stroke-width: 0; background-color: transparent;'
    );
  });

  it('defaults to a light theme', () => {
    const hill = setupHillChart();
    expect(hill.darkMode).toBe(false);
    expect(svg.getAttribute('class')).toBe('hill-chart-light');
  });

  it('supports enabling dark mode', () => {
    config.darkMode = true;
    const hill = setupHillChart();
    expect(hill.darkMode).toBe(true);
    expect(svg.getAttribute('class')).toBe('hill-chart-dark');
  });

  it('defaults to the appropriate light mode backgroundColor, with no argument', () => {
    config.backgroundColor = undefined;
    setupHillChart();
    expect(svg.getAttribute('style')).toBe(
      'stroke-width: 0; background-color: #ffffff;'
    );
  });

  it('defaults to the appropriate light mode backgroundColor', () => {
    config.backgroundColor = true;
    setupHillChart();
    expect(svg.getAttribute('style')).toBe(
      'stroke-width: 0; background-color: #ffffff;'
    );
  });

  it('defaults to the appropriate dark mode backgroundColor', () => {
    config.backgroundColor = true;
    config.darkMode = true;
    setupHillChart();
    expect(svg.getAttribute('style')).toBe(
      'stroke-width: 0; background-color: #2f3437;'
    );
  });

  it('supports defining a specific backgroundColor', () => {
    config.backgroundColor = '#000';
    setupHillChart();
    expect(svg.getAttribute('style')).toBe(
      'stroke-width: 0; background-color: #000;'
    );
  });
});

describe('hillchart@render', () => {
  it('renders the horizontal bottom line on X axis with top margin of 5', () => {
    const hill = setupHillChart();
    hill.render();
    expect(
      svg
        .getElementsByClassName('hill-chart-bottom-line')[0]
        .getAttribute('transform')
    ).toBe(`translate(0, ${hill.chartHeight + 5})`);
  });

  it('renders the main curve line', () => {
    const hill = setupHillChart();
    hill.render();

    expect(
      svg.getElementsByClassName('chart-hill-main-curve')[0]
    ).not.toBeNull();
  });

  it('renders the line in the middle correctly relative to the chart size', () => {
    const hill = setupHillChart();
    hill.render();
    const middleLine = svg.getElementsByClassName('hill-chart-middle-line')[0];
    expect(middleLine.getAttribute('x1')).toEqual(
      middleLine.getAttribute('x2')
    );
  });

  it('renders the footer text correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.footerText!.fontSize = 1;

    const hill = setupHillChart();
    hill.render();

    const svgElement = svg.getElementsByClassName(
      'hill-chart-text'
    )[0] as SVGGElement;

    expect(svgElement.style.getPropertyValue('font-size')).toBe('1rem');

    expect(
      svg.getElementsByClassName('hill-chart-text')[0].innerHTML
    ).toContain('Figuring things out');

    expect(svgElement.style.getPropertyValue('font-size')).toBe('1rem');
    expect(
      svg.getElementsByClassName('hill-chart-text')[1].innerHTML
    ).toContain('Making it happen');
  });

  it('dosent render the footer text if specified', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.footerText!.show = false;

    const hill = setupHillChart();
    hill.render();

    expect(svg.getElementsByClassName('hill-chart-text')[0]).toBeUndefined();
    expect(svg.getElementsByClassName('hill-chart-text')[1]).toBeUndefined();
  });
});

describe('hillchart@replaceData', () => {
  it('replaces the dataset with the provided input', () => {
    const hill = setupHillChart();
    hill.replaceData(replacementData);
    hill.data.forEach((point, index) => {
      expect(point.color).toEqual(replacementData[index].color);
      expect(point.description).toEqual(replacementData[index].description);
      expect(point.x).toEqual(replacementData[index].x);
    });
  });
  it('normalizes the data set', () => {
    const hill = setupHillChart();
    hill.replaceData(replacementData);
    hill.data.forEach((point, index) => {
      expect(point.id).toBeDefined();
      expect(point.id).not.toEqual(data[index].id);
      expect(point.y).toEqual(hillFn(point.x));
      expect(point.size).toBe(10);
      expect(point.link).toBeUndefined();
    });
  });
});
