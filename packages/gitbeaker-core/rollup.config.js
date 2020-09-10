import pkg from './package.json';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.main, // CommonJS (for Node) build.
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [esbuild()],
  },
  {
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.module, // ES Module (for bundlers) build.
      format: 'es',
      sourcemap: true,
    },
    plugins: [esbuild()],
  },
  {
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.types, // Typings (for typescript) build.
      format: 'es',
    },
    plugins: [dts()],
  },
];
