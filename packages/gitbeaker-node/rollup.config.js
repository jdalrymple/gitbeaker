import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    output: [
      {
        file: pkg.main, // CommonJS (for Node) (for bundlers) build.
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module, // ES module (for bundlers) build.
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      esbuild({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];
