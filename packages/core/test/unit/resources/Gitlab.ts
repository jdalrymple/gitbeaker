import { RequesterFn } from '@gitbeaker/requester-utils';
import { describe, expect, it, vi } from 'vitest';

import * as Resources from '../../../src/resources';

const { Gitlab, ...resources } = Resources;

describe('Instantiating All resources', () => {
  it('should create a valid gitlab service object using import', () => {
    const bundle = new Gitlab({
      requesterFn: vi.fn<RequesterFn>(),
      token: 'abcdefg',
    });

    Object.keys(resources).forEach((rk) => {
      expect(Object.keys(bundle)).include(rk);
    });
  });
});
