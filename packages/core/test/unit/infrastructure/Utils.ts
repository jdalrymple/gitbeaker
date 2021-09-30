import { getAPIMap } from '../../../src/infrastructure';

jest.mock(
  '../../../dist/map.json',
  () => {
    throw new Error();
  },
  { virtual: true },
);

describe('getAPIMap', () => {
  it('should throw error if file DNE', () => {
    expect(() => {
      getAPIMap();
    }).toThrow();
  });
});
