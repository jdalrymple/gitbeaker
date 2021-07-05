import 'jest-extended';
import * as CoreGB from '@gitbeaker/core';
import * as NodeGB from '../../src';

const { Types: browserTypes, ...nodeResources } = NodeGB;
const { getAPIMap, Types: coreTypes, ...coreResources } = CoreGB;

describe('Node Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(nodeResources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
