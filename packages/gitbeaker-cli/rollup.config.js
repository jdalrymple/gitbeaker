import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: {
    file: pkg.bin.gitbeaker,
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    json(),
    preserveShebangs()
  ],
};
