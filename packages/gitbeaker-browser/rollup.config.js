import resolve from '@rollup/plugin-node-resolve';
// // import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs'
import polyfills from 'rollup-plugin-node-polyfills';
import pkg from './package.json';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser, // Browser (for Node) build.
      format: 'iife',
      name: 'gitbeaker',
      sourcemap: true,
      globals: {
        'formdata-node': 'FormData',
      },
    },
    plugins: [resolve(), commonjs(), json(), polyfills(), esbuild()],
  },
  {
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.types, // Typings (for typescript) build.
      format: 'es',
    },
    plugins: [dts()],
  },
];
