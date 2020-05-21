import { range } from 'd3-array';
import {
  hillFn,
  hillFnInverse,
  textOutRange,
  calculateTextPositionForX,
  uId,
} from '../src/helpers';

describe('hill chart helper', () => {
  it('computes correct values', () => {
    expect.hasAssertions();
    expect(hillFn(0)).toEqual(0);
    expect(hillFn(25)).toEqual(50.000000000000014);
    expect(hillFn(50)).toEqual(100);
    expect(hillFn(100)).toEqual(0);
  });
});

describe('hill chart inverse helper', () => {
  it('computes correct values', () => {
    expect.hasAssertions();
    expect(hillFnInverse(0)).toEqual(0);
    expect(hillFnInverse(25)).toEqual(16.666666666666664);
    expect(hillFnInverse(50)).toEqual(25);
    expect(hillFnInverse(100)).toEqual(50);
  });
});

describe('out of range helper', () => {
  it('returns true when passed value between 80 and 100', () => {
    expect.hasAssertions();
    expect(textOutRange(20)).toBe(false);
    expect(textOutRange(80)).toBe(true);
    expect(textOutRange(100)).toBe(true);
  });
});

describe('uId helper', () => {
  it('generates random IDs', () => {
    expect.hasAssertions();

    const data = range(1, 1000).map(() => uId());

    const isArrayUnique = (arr) =>
      Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(isArrayUnique(data)).toBe(true);
  });
});

describe('calculate text position on x axis helper', () => {
  it('returns positive value if text isnt out of range and negative it is. based on the point size and x axis position', () => {
    expect.hasAssertions();
    let pointSize = 10;
    let x = 50;
    expect(calculateTextPositionForX(pointSize, x)).toEqual(15);

    pointSize = 15;
    x = 80;
    expect(calculateTextPositionForX(pointSize, x)).toBe(-20);
  });
});
