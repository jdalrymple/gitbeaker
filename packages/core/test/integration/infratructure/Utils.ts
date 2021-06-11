import 'jest-extended';
import * as Core from '../../../src';

const { Types, getAPIMap, Gitlab, ...resources } = Core;

describe('getAPIMap', () => {
  it('should throw error if file DNE', () => {
    const map = getAPIMap();

    expect(map).toBeInstanceOf(Object);
    expect(Object.keys(map)).toIncludeAllMembers(Object.keys(resources));
  });
});
