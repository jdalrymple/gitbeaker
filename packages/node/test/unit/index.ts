import 'jest-extended';
import { Resources as coreResources } from '@gitbeaker/core';
import * as NodeGB from '../../src';

const { Types, ...nodeResources } = NodeGB;

describe('Node Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(nodeResources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
