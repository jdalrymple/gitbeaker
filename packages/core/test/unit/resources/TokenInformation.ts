import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TokenInformation } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: TokenInformation;

beforeEach(() => {
  service = new TokenInformation({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('TokenInformation.show', () => {
  it('should request POST admin/token', async () => {
    await service.show('tok');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'admin/token', {
      body: { token: 'tok' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('TokenInformation.revoke', () => {
  it('should request DEL admin/token', async () => {
    await service.revoke('tok');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'admin/token', {
      body: { token: 'tok' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
