const external = require('rollup-plugin-peer-deps-external');
// const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
// const replace = require('@rollup/plugin-replace');
const babel = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.node'];

module.exports = {
  input: 'src/pages/index.tsx',
  output: [
    {
      file: 'umd/index.js',
      format: 'es',
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    json(),
    resolve({
      extensions,
      preferBuiltins: true,
    }),
    commonjs(),
    postcss(),
    babel({
      extensions,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
      babelHelpers: 'runtime',
    }),
    external(),
  ],
  external: ['react'],
};
