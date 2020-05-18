import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cjs from '@rollup/plugin-commonjs';
import bundleSize from 'rollup-plugin-bundle-size';
import visualizer from 'rollup-plugin-visualizer';
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
    format: 'umd',
  },
];

const common = {
  input: 'src/index.js',
  plugins: [
    // serve({ open: true, contentBase: 'dist' }),
    // livereload('dist'),
    cjs({
      include: 'node_modules/**',
    }),
    resolve(),
    babel({
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

export default outputs.map((output) => ({
  ...common,
  output,
}));
