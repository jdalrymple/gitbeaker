import resolve from '@rollup/plugin-node-resolve';
// // import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    import: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.browser, // Browser (for Node) build.
      format: 'iife',
      sourcemap: true,
      globals: {
        'formdata-node': 'FormData',
      },
    },
    plugins: [esbuild(), resolve()],
  },
  {
    import: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
    output: {
      file: pkg.types, // Typings (for typescript) build.
      format: 'es',
    },
    plugins: [dts()],
  },
];
