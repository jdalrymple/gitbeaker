import * as Resources from '../../../src/resources';

import { describe, expect, it, vi } from 'vitest';

const { Gitlab, ...resources } = Resources;

describe('Instantiating All resources', () => {
  it('should create a valid gitlab service object using import', () => {
    const bundle = new Gitlab({
      requesterFn: vi.fn(),
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers(Object.keys(resources));
  });
});
