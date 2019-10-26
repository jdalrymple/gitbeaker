import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
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
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      replace({
        delimiters: ['', ''],
        '#!/usr/bin/env node': '',
      }),
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
      name: 'gitlab',
      format: 'umd',
      exports: 'named',
    },
    plugins: [resolve({ browser: true }), commonjs(), ts({ typescript }), terser()],
  },

  {
    input: 'src/core/index.ts',
    output: [
      {
        file: pkg.main, // CommonJS (for Node) (for bundlers) build.
        format: 'cjs',
      },
      {
        file: pkg.module, // ES module (for bundlers) build.

        format: 'es',
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [ts({ typescript }), terser()],
  },
];
