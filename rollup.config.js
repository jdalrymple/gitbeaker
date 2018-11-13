import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";
import { plugin as analyze } from 'rollup-plugin-analyzer'
import typescript from 'typescript';
import pkg from './package.json';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.browser.js',
      name: 'node-gitlab',
      format: 'umd',
      exports: 'named',
      globals: {
        'got': 'Request',
        'humps': 'Humps',
        'randomstring': 'RandomString',
        'query-string' : 'QueryString',
        'form-data': 'FormData',
      }
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      json(),
      resolve({ browser: true }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      ts({ typescript }),
      terser(),
      analyze()
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
      ts({ typescript }),
      terser(),
      analyze()
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
      analyze()
    ],
  },
];
