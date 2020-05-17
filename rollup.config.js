import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

// import pkg from './package.json';

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
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    production && terser(),
  ],
};

export default outputs.map((output) => ({
  ...common,
  output,
}));
