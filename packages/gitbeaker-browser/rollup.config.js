import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
// import pkg from './package.json';
// // import { terser } from 'rollup-plugin-terser';
import { commonConfig, commonPlugins } from '../../rollup.config';
// //
// export default [
//   {
//     ...commonConfig,
//     output: {
//       file: pkg.browser,
//       name: 'gitbeaker',
//       format: 'iife',
//       exports: 'named',
//     },
//     // external: ['react', 'react-dom'],
//     // globals: {
//     //   'react': 'React',
//     //   'react-dom': 'ReactDOM'
//     // },
//     plugins: [
//       globals(),
//       resolve(),
//       commonjs(),
//       ...commonPlugins,
//       //resolve(),
//       // terser(),
//     ],
//   },
// ];
import polyfills from 'rollup-plugin-node-polyfills';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const name = pkg.main.replace(/\.js$/, '');

const ext = (format) => (format == 'dts' ? 'd.ts' : format == 'es' ? 'es.js' : 'js');

function bundle(format) {
  let plugins = [];

  switch (format) {
    case 'dts':
      plugins.push(dts());
      break;
    case 'iife':
      plugins.push(polyfills(), resolve(), commonjs(), esbuild());
      break;
    default:
      plugins.push(esbuild());
      break;
  }

  return {
    ...commonConfig,
    output: {
      name: format == 'iife' ? 'gitbeaker' : undefined,
      file: `${name}.${ext(format)}`,
      format: format == 'dts' ? 'es' : format,
      sourcemap: format != 'dts',
    },
    plugins,
    external: (id) => !/^[./]/.test(id),
  };
}

console.log(bundle('iife'));

export default [
  // bundle('es'),
  bundle('iife'),
  // bundle('dts'),
];
