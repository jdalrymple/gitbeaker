import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';
import { commonConfig, commonPlugins } from '../../rollup.config';

export default [
  {
    ...commonConfig,
    output: {
      file: pkg.browser,
      name: 'gitbeaker',
      format: 'umd',
      exports: 'named',
    },
    plugins: [
      globals(),
      builtins(),
      resolve({ browser: true }),
      commonjs(),
      ...commonPlugins,
      json(),
    ],
  },
];
