import 'jest-extended';
import * as CoreGB from '@gitbeaker/core';
import * as BrowserGB from '../../src';

const { Types: browserTypes, ...browserResources } = BrowserGB;
const { getAPIMap, Types: coreTypes, ...coreResources } = CoreGB;

describe('Browser Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(browserResources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
