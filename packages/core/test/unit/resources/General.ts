import { describe, expect, it, vi } from 'vitest';
import { RequesterFn } from '@gitbeaker/requester-utils';
import * as Resources from '../../../src/resources';

describe('Instantiating services', () => {
  it('should create a valid service object for each export', () => {
    Object.entries(Resources).forEach(([k, V]) => {
      const service = new (V as any)({
        requesterFn: vi.fn<RequesterFn>(),
        token: 'abcdefg',
      });

      expect(service.constructor.name).toBe(k);
      expect(service.url).toBeDefined();
      expect(service.authHeaders).toMatchObject({
        'private-token': expect.any(Function),
      });
      expect(service.queryTimeout).toBe(300000);
    });
  });
});
