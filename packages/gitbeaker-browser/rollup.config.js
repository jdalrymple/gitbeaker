import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
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
      typescript({
        tsconfig: './tsconfig.json',
      }),
      commonjs(),
      terser({ mangle: false }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];
