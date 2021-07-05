import 'jest-extended';
import * as Core from '../../../src';

const { Types, getAPIMap, Gitlab, ...resources } = Core;

describe('getAPIMap', () => {
  it('should return object representing all resources in JSON format', () => {
    const map = getAPIMap();

    expect(map).toBeInstanceOf(Object);
    expect(Object.keys(map)).toIncludeAllMembers(Object.keys(resources));
  });
});
