import 'jest-extended';
import { getAPIMap, Resources } from '../../../src';

describe('getAPIMap', () => {
  it('should return object representing all resources in JSON format', () => {
    const map = getAPIMap();

    expect(map).toBeInstanceOf(Object);
    expect(Object.keys(map)).toIncludeAllMembers(Object.keys(Resources));
  });
});
