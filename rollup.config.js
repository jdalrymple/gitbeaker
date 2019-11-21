import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
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
      ts({ typescript, useTsconfigDeclarationDir: true }),
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
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      ts({ typescript, useTsconfigDeclarationDir: true }),
      terser(),
    ],
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
    plugins: [ts({ typescript, useTsconfigDeclarationDir: true }), terser()],
  },
];
