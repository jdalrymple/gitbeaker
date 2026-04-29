import { Keys } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Keys;

beforeEach(() => {
  service = new Keys({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Keys.show', () => {
  it('should request GET /keys/1', async () => {
    await service.show({ keyId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'keys/1', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /keys?fingerprint=1', async () => {
    await service.show({ fingerprint: '1' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'keys?fingerprint=1', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should throw an error if keyId or fingerprint is not passed', () => {
    expect(() => service.show({} as any)).toThrow(
      'Missing required argument. Please supply a keyId or fingerprint in the options parameter.',
    );
  });
});
