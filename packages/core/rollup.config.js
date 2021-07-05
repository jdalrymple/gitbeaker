import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: pkg.main, // CommonJS (for Node) build.
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
    replace({
      '../../dist/map.json': './map.json',
      delimiters: ['', ''],
      preventAssignment: true,
    }),
    ts({
      tsconfigOverride: {
        compilerOptions: {
          baseUrl: '.',
        },
      },
      useTsconfigDeclarationDir: true,
    }),
  ],
};
