import * as coreResources from '@gitbeaker/core';
import * as resources from '../../src';

import { describe, expect, it } from 'vitest';

describe('Import', () => {
  it('should re-export all resources from core', () => {
    expect(Object.keys(resources)).toIncludeAllMembers(Object.keys(coreResources));
  });
});
