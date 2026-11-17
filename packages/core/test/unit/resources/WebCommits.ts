import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { WebCommits } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: WebCommits;

beforeEach(() => {
  service = new WebCommits({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('WebCommits.showPublicKey', () => {
  it('should request GET /web_commits/public_key', async () => {
    await service.showPublicKey({ sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'web_commits/public_key', {
      sudo: 'u',
      showExpanded: true,
    });
  });

  it('should work without options', async () => {
    await service.showPublicKey();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'web_commits/public_key', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});
