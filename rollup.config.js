import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";
import typescript from 'typescript';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/bundle.js',
      name: 'node-gitlab',
      format: 'umd',
      exports: 'named'
    },
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      json(),
      resolve({ browser: true }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      ts({ typescript }),
      terser(),
    ],
  },

  // CommonJS (for Node) (for bundlers) build.
  {
    input: 'src/index.ts',
    output: { file: pkg.main, format: 'cjs' },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      ts({ typescript }),
      terser(),
    ],
  },

  // ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    output: { file: pkg.module, format: 'es' },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      ts({ typescript }),
      terser(),
    ],
  },
];
