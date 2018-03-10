import * as Services from './services';

export const API = credentials =>
  Object.entries(Services).reduce(
    (output, [key, Value]) => { output[key] = new Value(credentials); return output; },
    {},
  );

export * from './services';
