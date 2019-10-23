import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import typescript from 'typescript';
import pkg from './package.json';

export default [
  // CLI build
  {
    input: 'src/bin/index.ts',
    output: {
      banner: '#!/usr/bin/env node',
      file: pkg.bin.gitlab,
      format: 'cjs',
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      replace({
        delimiters: ['', ''],
        '#!/usr/bin/env node': '',
      }),
      globals(),
      builtins(),
      resolve(),
      commonjs(),
      json(),
      ts({ typescript }),
      terser(),
    ],
  },

  // Browser-friendly UMD build
  {
    input: 'src/core/index.ts',
    output: {
      file: pkg.browser,
      name: 'node-gitlab',
      format: 'umd',
      exports: 'named',
      globals: {
        li: 'Li',
        humps: 'Humps',
        'query-string': 'QueryString',
        randomstring: 'RandomString',
        'ky-universal': 'Ky',
        'form-data': 'FormData',
        'universal-url': 'universal-url',
      },
    },
    plugins: [
      globals(),
      builtins(),
      resolve({ browser: true }),
      commonjs(),
      json(),
      ts({ typescript }),
      terser(),
    ],
  },

  // CommonJS (for Node) (for bundlers) build.
  {
    input: 'src/core/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [globals(), builtins(), ts({ typescript }), terser()],
  },

  // ES module (for bundlers) build.
  {
    input: 'src/core/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: [...Object.keys(pkg.dependencies)],
    plugins: [ts({ typescript }), terser()],
  },
];
