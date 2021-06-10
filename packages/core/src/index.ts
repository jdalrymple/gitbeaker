/* ----------------- API Map --------------- */

export function getAPIMap(): Record<string, unknown> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/no-unresolved
    return require('../dist/map.json') as Record<string, unknown>;
  } catch (e) {
    throw new Error('This function is only available in the distributed code');
  }
}

/* ---------------- Resources --------------- */
export * from './resources';

/* ----------------  Types ----------------- */
export * as Types from './types';
