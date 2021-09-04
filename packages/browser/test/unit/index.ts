import 'jest-extended';
import { Resources as coreResources } from '@gitbeaker/core';
import * as BrowserGB from '../../src';

const { Types, ...browserResources } = BrowserGB;

describe('Browser Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(browserResources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
