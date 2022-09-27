import path from 'path';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cjs from '@rollup/plugin-commonjs';
import bundleSize from 'rollup-plugin-bundle-size';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;
const dist = 'dist';
const bundle = 'hill-chart';

const commonOptions = {
  plugins: [
    cjs({
      include: 'node_modules/**',
    }),
    typescript({
      declaration: !!production,
      declarationDir: 'dist',
      include: ['src/**/*'],
      exclude: ['node_modules', '__test__'],
    }),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),

    production && terser(),
    postcss({
      extract: path.resolve('dist/styles.css'),
      plugins: [autoprefixer(), cssnano()],
    }),
    bundleSize(),
    visualizer({
      gzipSize: true,
    }),
  ],
};

const full = {
  input: 'src/index.ts',
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
      exports: 'default',
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm',
      exports: 'default',
    },
    {
      name: 'HillChart',
      file: `${dist}/${bundle}.umd.js`,
      format: 'umd',
      exports: 'default',
    },
  ],

  ...commonOptions,
};

const withoutD3 = {
  input: 'src/index.ts',
  external: [
    'd3-selection',
    'd3-scale',
    'd3-axis',
    'd3-shape',
    'd3-drag',
    'd3-array',
  ],
  output: [
    {
      name: 'HillChart',
      file: `${dist}/${bundle}.nod3.umd.js`,
      format: 'umd',
      globals: {
        'd3-selection': 'd3',
        'd3-scale': 'd3',
        'd3-axis': 'd3',
        'd3-shape': 'd3',
        'd3-drag': 'd3',
        'd3-array': 'd3',
      },
    },
  ],

  ...commonOptions,
};

const d3 = {
  input: 'src/d3.ts',
  output: {
    file: `${dist}/d3.min.js`,
    name: 'd3',
    format: 'umd',
  },
  ...commonOptions,
};

export default [{ ...d3 }, { ...full }, { ...withoutD3 }];
