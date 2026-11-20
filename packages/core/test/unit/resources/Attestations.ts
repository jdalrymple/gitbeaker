import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Attestations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Attestations;

beforeEach(() => {
  service = new Attestations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Attestations.all', () => {
  it('should request GET /projects/:id/attestations/:digest', async () => {
    await service.all(1, 'sha256:abc');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/attestations/sha256%3Aabc',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should pass pagination options as searchParams', async () => {
    await service.all('a/b', 'abc', { perPage: 5, maxPages: 2, sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/a%2Fb/attestations/abc', {
      maxPages: 2,
      searchParams: { perPage: 5 },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('Attestations.download', () => {
  it('should request GET /projects/:id/attestations/:iid/download', async () => {
    await service.download(1, 2, { sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/attestations/2/download',
      { showExpanded: undefined, sudo: 'u' },
    );
  });
});
