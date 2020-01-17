import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';
import { commonConfig, commonPlugins } from '../../rollup.config';

export default [
  {
    ...commonConfig,
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    output: [
      {
        file: pkg.main, // CommonJS (for Node) (for bundlers) build.
        format: 'cjs',
      },
      {
        file: pkg.module, // ES module (for bundlers) build.
        format: 'es',
      },
    ],
    plugins: commonPlugins,
  },
  {
    ...commonConfig,
    output: {
      file: pkg.browser,
      name: 'gitbeaker',
      format: 'umd',
      exports: 'named',
    },
    plugins: [
      replace({
        GotRequester: 'KyRequester',
      }),
      globals(),
      builtins(),
      resolve({ browser: true }),
      commonjs(),
      ...commonPlugins,
    ],
  },
];
