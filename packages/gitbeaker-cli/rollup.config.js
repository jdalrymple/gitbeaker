import pkg from './package.json';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.bin.gitbeaker,
      format: 'cjs',
    },
    plugins: [esbuild(), json(), preserveShebangs()],
  },
];
