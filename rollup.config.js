import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import typescript from 'typescript';
import pkg from './package.json';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      name: 'node-gitlab',
      format: 'umd',
      exports: 'named',
      globals: {
        'li': 'Li',
        'humps': 'Humps',
        'query-string': 'QueryString',
        'randomstring': 'RandomString',
        'ky-universal': 'Ky',
        'form-data': 'FormData',
        'universal-url':'universal-url'
      }
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      globals(),
      builtins(),
      resolve({ browser: true }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json(),
      ts({ typescript }),
      terser(),
    ],
  },

  // CommonJS (for Node) (for bundlers) build.
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      globals(),
      builtins(),
      ts({ typescript }),
      terser(),
    ],
  },

  // ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      ts({ typescript }),
      terser(),
    ],
  },
];
