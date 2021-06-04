import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import pkg from './package.json';
import { commonConfig, commonPlugins } from '../../rollup.config.js';

export default {
  ...commonConfig,
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: {
    file: pkg.bin.gitbeaker,
    format: 'cjs',
  },
  plugins: [...commonPlugins, json(), preserveShebangs()],
};
