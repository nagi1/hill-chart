import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const production = !process.env.ROLLUP_WATCH;
const dist = 'dist';
const bundle = 'bundle';

const outputs = [
  {
    file: `${dist}/${bundle}.cjs.js`,
    format: 'cjs',
  },
  {
    file: `${dist}/${bundle}.esm.js`,
    format: 'esm',
  },
  {
    name: 'HillChart',
    file: `${dist}/${bundle}.umd.js`,
    globals: {
      'event-emitter-es6': 'EventEmitter',
      'd3-selection': 'd3Selection',
      'd3-scale': 'd3Scale',
      'd3-axis': 'd3Axis',
      'd3-shape': 'd3Shape',
      'd3-drag': 'd3Drag',
      'd3-array': 'd3Array',
    },
    format: 'umd',
  },
];

const common = {
  input: 'src/index.js',
  external: [
    'd3-array',
    'd3-axis',
    'd3-drag',
    'd3-scale',
    'd3-selection',
    'd3-shape',
    'event-emitter-es6',
  ],
  plugins: [
    // serve({ open: true, contentBase: 'dist' }),
    // livereload('dist'),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    production && terser(),
    postcss({
      extract: path.resolve('dist/styles.css'),
      plugins: [autoprefixer(), cssnano()],
    }),
  ],
};

export default outputs.map((output) => ({
  ...common,
  output,
}));
