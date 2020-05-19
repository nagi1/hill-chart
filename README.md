# hill-chart

[![](./media/screenshot.png)]()

[Basecamp's hill chart](https://basecamp.com/features/hill-charts) implementation using [D3.js](https://d3js.org/), **Try the [demo](https://nagi1.github.io/hill-chart/)**

<br/>

[![Build Status](https://travis-ci.com/nagi1/hill-chart.svg?branch=master)](https://travis-ci.com/nagi1/hill-chart) [![Coverage Status](https://coveralls.io/repos/github/nagi1/hill-chart/badge.svg?branch=master)](https://coveralls.io/github/nagi1/hill-chart?branch=master) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/25cb5660479340ecb20f44f3f36dd4ae)](https://www.codacy.com/manual/nagi1/hill-chart?utm_source=github.com&utm_medium=referral&utm_content=nagi1/hill-chart&utm_campaign=Badge_Grade) [![Demo](https://img.shields.io/badge/Demo-Available-success)](https://nagi1.github.io/hill-chart/) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br/>

## Features

- [x] Implemented in pure ES6/JS using [D3.js](https://d3js.org)
- [x] Customizable
- [x] Tested (kinda 😅)
- [x] Easily wrapped and integrated into other UI frameworks

## Getting started

Install using yarn

```bash
yarn add hill-chart
```

using npm

```bash
npm i hill-chart
```

<br/>

Using CDN including custom d3js bundled ~ 48kb (16kb gizp)

```html
<script src="https://unpkg.com/hill-chart@latest/dist/bundle.udm.js" />
```

or CDN for the custom d3js bundle minified ~ 41kb (14 gizp)

```html
<script src="https://unpkg.com/hill-chart@latest/dist/d3.min.js" />
```

hill chart only minified ~8kb (2kb gzip)

```html
<script src="https://unpkg.com/hill-chart@latest/dist/bundle.udm.min.js" />
```

## Documentation

### Tailwind Config

#### Screen sizes

```js
screens: {
			iphone5: '320px',
			xs: '320px',
			iphonex: '375px',
			iphonePlus: '414px',
			colbreak: '500px',
			sm: '640px',
			ipad: '768px',
			md: '768px',
			lg: '930px',
			ipadAir: '1024px',
			xl: '1024px',
			laptop: '1100px',
			'2xl': '1280px',
			'3xl': '1320px',
			laptopl: '1440px',
			colView: { min: '1px', max: '499px' },
			menubreak: { min: '931px', max: '1023px' },
			rightsidebreak: { min: '637px', max: '905px' },
			afterRightSideBreak: { min: '905px', max: '929px' },
		},
```

\***\*Note: Order of sizes matters\*\***

### PostCss config

`cat css/*.css | postcss > ./public/build/styles.css`

Postcss will compile fontawsome (fa.css) and (tailwind.css) into one minified bundle (styles.css)

- **In production `yarn production`**
  - PurgeCss
  - cssnano

will minifiy the whole bundle into 12kb!

---

## Contributing

> To get started...

- Take a quick look on [Todo List](#todo-list)
- Open issue to share and discuses new ideas or features.

### Step 2

- Fork this repo!
- Commit to the [develop](https://github.com/nagi1/twitter-clone/tree/develop) branch

- **Do your thing.**

### Step 3

- Create a new pull request

---

## Todo List

- [ ] Add NPM support
- [ ] Edit the Readme.md
- [ ] Create community
- [ ] Unify screen sizes
- [ ] Move to [Material Icons](https://material.io/resources/icons/)
- [ ] Fix button sizes
- [ ] Fix Mobile version
- [ ] Extract to vue components
- [ ] un-Spaghetti the code!
- [ ] Add setting page
- [ ] Add more tweet cards
- [ ] Add direct messages page

---

## License
