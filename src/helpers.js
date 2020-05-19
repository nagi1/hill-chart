// Some math magic of the function responsible for produce
// hill-like curve and, correctly position and drag
// points on the Y axis
export const hillFn = (point) =>
  50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;

// The inverse of the same magic to convert back values from
// chart back to the original before hillFn(). mainly used
// in dragging event and setting the setting new values.
export const hillFnInverse = (point) =>
  (25 * (2 * Math.asin((point - 50) / 50) + Math.PI)) / Math.PI;

// Calculate when the point is just near to the right side of the chart
export const textOutRange = (x) => x >= 80 && x <= 100;

export const calculateTextPositionForX = (size, x) => {
  const margin = size + 5;
  return textOutRange(x) ? -1 * margin : margin;
};

export const calculateTextMarginForY = () => 5;
