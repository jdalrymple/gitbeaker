import pkg from './package.json';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    import: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.bin.gitbeaker,
      format: 'cjs',
    },
    plugins: [esbuild(), json(), preserveShebangs()],
  },
];
