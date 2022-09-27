const data = [
  {
    color: 'red',
    description: 'Late af task',
    size: 10,
    x: 12.069770990416055,
    y: 13.701965652222704, // optionally, provide a specific Y value
    link: '/fired.html',
  },

  {
    color: 'yellow',
    description: 'Gettin there',
    size: 10,
    x: 55.11627906976744,
  },
  {
    color: 'green',
    description: 'Hell yeah!',
    x: 93.48837209302326,
    size: 10,
  },
];

const updatedData = [
  {
    color: 'red',
    description: 'Late af task',
    size: 10,
    x: 30,
    link: '/fired.html',
  },
  {
    color: 'yellow',
    description: 'Gettin there',
    size: 10,
    x: 60,
  },
  {
    color: 'green',
    description: 'Hell yeah!',
    x: 100,
    size: 10,
  },
  {
    color: 'blue',
    description: 'Forgot about Dre',
    size: 10,
    x: 50,
  },
];

const options = {
  target: '#hill-chart',
  width: 700,
  height: 270,
  preview: false,
  footerText: {
    show: true,
    fontSize: 0.75, // rem
  },
};

function createAndRenderHill(data, options) {
  /** @type {import('../src/types').IHillChartClass} */
  const hill = new /** @type {any} */ (window).HillChart(data, options);

  hill.on('home', (data) => {
    console.log(`Started Over:`);
    console.log(data);
  });

  hill.on('end', (data) => {
    console.log(`Finished Over:`);
    console.log(data);
  });

  hill.on('move', (x, y) => {
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
  });

  hill.on('moved', (data) => {
    console.log(`Point moved`);
    console.log(data);
  });

  return hill;
}

let hill = createAndRenderHill(data, options);
hill.render();

// Handle enable dark mode
/**
 * @type {HTMLButtonElement | null}
 */
document.getElementById('darkMode')?.addEventListener('click', (e) => {
  e.preventDefault();
  const buttonElement = /** @type {HTMLButtonElement} */ (e.target);

  // Reset the svg styling
  hill.svg.attr('class', '');
  hill.svg.selectAll('*').remove();

  // Re-render the hill chart in dark mode
  /**
   * @type {boolean}
   */
  const darkMode = buttonElement.innerText === 'Dark Mode' ? true : false;
  hill = createAndRenderHill(
    data,
    Object.assign({}, options, {
      darkMode,
      backgroundColor: darkMode,
    })
  );
  hill.render();

  // Change button text for toggle
  buttonElement.innerText = darkMode ? 'Light Mode' : 'Dark Mode';
});

document.getElementById('replaceData')?.addEventListener('click', (e) => {
  e.preventDefault();
  const buttonElement = /** @type {HTMLButtonElement} */ (e.target);

  const reset = buttonElement.innerText.indexOf('Reset') > -1;

  // Variable dataset
  const dataset = reset ? data : updatedData;
  hill.replaceAndUpdate(dataset);

  // Change button text for toggle
  buttonElement.innerText = reset ? 'Replace Data' : 'Reset Data';
});
