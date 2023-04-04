import * as coreResources from '@gitbeaker/core';
import * as GB from '../../src';

const { Types, ...resources } = GB;

describe('Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(resources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
