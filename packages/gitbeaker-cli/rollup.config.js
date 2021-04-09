import esbuild from 'rollup-plugin-esbuild';
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
  plugins: [
    esbuild({
      sourceMap: true,
      tsconfig: './tsconfig.json',
    }),
    preserveShebangs(),
  ],
};
