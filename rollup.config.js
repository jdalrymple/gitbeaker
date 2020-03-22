import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import typescript from 'typescript';

export const commonPlugins = [ts({ typescript, useTsconfigDeclarationDir: true }), terser()];
export const commonConfig = {
  input: 'src/index.ts',
};
