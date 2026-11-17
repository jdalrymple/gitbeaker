import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorTrackingClientKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ErrorTrackingClientKeys;

beforeEach(() => {
  service = new ErrorTrackingClientKeys({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ErrorTrackingClientKeys.all', () => {
  it('should request GET /projects/:id/error_tracking/client_keys', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/client_keys',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should pass pagination options', async () => {
    await service.all('a/b', { perPage: 5, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/a%2Fb/error_tracking/client_keys',
      { maxPages: 2, searchParams: { perPage: 5 }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ErrorTrackingClientKeys.create', () => {
  it('should request POST /projects/:id/error_tracking/client_keys', async () => {
    await service.create(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/client_keys',
      { showExpanded: undefined, sudo: 'u' },
    );
  });
});

describe('ErrorTrackingClientKeys.remove', () => {
  it('should request DELETE /projects/:id/error_tracking/client_keys/:keyId', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/error_tracking/client_keys/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
