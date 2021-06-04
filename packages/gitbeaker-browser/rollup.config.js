import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';
import { commonConfig, commonPlugins } from '../../rollup.config.js';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    ...commonConfig,
    external: ['form-data'],
    output: {
      file: pkg.browser,
      name: 'gitbeaker',
      format: 'umd',
      exports: 'named',
      globals: { 'form-data': 'FormData' },
      sourcemap: true,
    },
    plugins: [
      globals(),
      builtins(),
      resolve({ browser: true }),
      ...commonPlugins,
      commonjs(),
      terser({ mangle: false }),
    ],
  }
];
