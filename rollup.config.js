import ts from 'rollup-plugin-typescript2';

export const commonPlugins = [ts({ useTsconfigDeclarationDir: true })];
export const commonConfig = {
  input: 'src/index.ts',
};
