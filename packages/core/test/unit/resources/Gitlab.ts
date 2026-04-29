import { RequesterFn } from '@gitbeaker/requester-utils';
import * as Resources from '../../../src/resources';

import { describe, expect, it, vi } from 'vitest';

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
