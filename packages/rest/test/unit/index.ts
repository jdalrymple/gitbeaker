import * as coreResources from '@gitbeaker/core';
import * as resources from '../../src';

describe('Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(resources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
