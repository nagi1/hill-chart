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

import pkg from './package.json';

const isProduction = !process.env.ROLLUP_WATCH;
const input = path.resolve('src/index.ts');
const distDir = path.resolve('dist');
const bundle = 'hill-chart';
const name = 'HillChart';

/**
 * inspired by
 * @see https://github.com/rollup/plugins/issues/247#issuecomment-663230846
 */
const getOutput = (format = 'esm') => {
  return {
    name: format === 'umd' ? name : undefined,
    file: `${distDir}/${bundle}.${format}.js`,
    format,
    exports: 'default',
  };
};

const getPlugins = (format = 'esm') => {
  const typeScriptOptions =
    format === 'esm'
      ? {
          declaration: !!isProduction,
          declarationDir: path.dirname(pkg.module),
          include: ['src/**/*'],
          exclude: ['node_modules', '__test__'],
        }
      : undefined;

  return [
    cjs({
      include: 'node_modules/**',
    }),
    typescript(typeScriptOptions),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),

    isProduction && terser(),
    postcss({
      extract: path.resolve('dist/styles.css'),
      plugins: [autoprefixer(), cssnano()],
    }),
    bundleSize(),
    visualizer({
      gzipSize: true,
    }),
  ];
};
export default [
  // cjs configuration
  {
    input,
    output: getOutput('cjs'),
    plugins: getPlugins('cjs'),
  },

  // esm configuration
  {
    input,
    output: getOutput('esm'),
    plugins: getPlugins('esm'),
  },

  // umd configuration
  {
    input,
    name,
    output: getOutput('umd'),
    plugins: getPlugins('umd'),
  },

  // withoutD3 configuration
  {
    input,
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
        name,
        file: `${distDir}/${bundle}.nod3.umd.js`,
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
    plugins: getPlugins('umd'),
  },

  // d3 configuration
  {
    input: 'src/d3.ts',
    output: {
      file: `${distDir}/d3.min.js`,
      name: 'd3',
      format: 'umd',
    },
    plugins: getPlugins('umd'),
  },
];
