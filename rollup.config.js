import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

export const commonPlugins = [ts({ typescript, useTsconfigDeclarationDir: true })];
export const commonConfig = {
  input: 'src/index.ts',
};
