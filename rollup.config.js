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
 *
 * @param {import('rollup').ModuleFormat} format
 * @returns {import('rollup').OutputOptions}
 */
const getOutput = (format = 'esm') => {
  /**
   * @type {import('rollup').OutputOptions}
   */
  const commonOptions = {
    exports: 'default',
    format,
    sourcemap: true,
  };

  if (format === 'esm') {
    return {
      ...commonOptions,
      dir: path.dirname(pkg.module),
      format,
    };
  }

  if (format === 'cjs') {
    return {
      ...commonOptions,
      file: `${path.dirname(pkg.main)}/${bundle}.${format}.js`,
    };
  }

  return {
    ...commonOptions,
    name: format === 'umd' ? name : undefined,
    file: `${distDir}/${format}/${bundle}.${format}.js`,
  };
};

/**
 * inspired by
 * @see https://github.com/rollup/plugins/issues/247#issuecomment-663230846
 *
 * @param {import('rollup').ModuleFormat} format
 * @returns {import('rollup').InputOptions["plugins"]}
 */
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
      extract: 'styles.css',
      plugins: [autoprefixer(), cssnano()],
    }),

    format !== 'esm' && bundleSize(),
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
        file: `${distDir}/umd/${bundle}.nod3.umd.js`,
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
      file: `${distDir}/umd/d3.min.js`,
      name: 'd3',
      format: 'umd',
    },
    plugins: getPlugins('umd'),
  },
];
