import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-typescript2';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: {
    file: pkg.bin.gitbeaker,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [ts({ useTsconfigDeclarationDir: true }), json(), preserveShebangs()],
};
