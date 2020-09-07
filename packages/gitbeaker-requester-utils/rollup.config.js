// import pkg from './package.json';
// import { commonConfig, commonPlugins } from '../../rollup.config';
//
// export default {
//   ...commonConfig,
//   external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
//   output: [
//     {
//       file: pkg.main, // CommonJS (for Node) (for bundlers) build.
//       format: 'cjs',
//       sourcemap: true,
//     },
//     {
//       file: pkg.module, // ES module (for bundlers) build.
//       format: 'es',
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//    ...commonPlugins,
//   ],
// };

import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

const name = pkg.main.replace(/\.js$/, '');

const ext = (format) => (format == 'dts' ? 'd.ts' : format == 'cjs' ? 'js' : 'es.js');

const bundle = (format) => ({
  input: 'src/index.ts',
  output: {
    file: `${name}.${ext(format)}`,
    format: format == 'cjs' ? 'cjs' : 'es',
    sourcemap: format != 'dts',
  },
  plugins: format == 'dts' ? [dts()] : [esbuild()],
  external: (id) => !/^[./]/.test(id),
});

export default [bundle('es'), bundle('cjs'), bundle('dts')];
