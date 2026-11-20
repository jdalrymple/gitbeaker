import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Metadata } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Metadata;

beforeEach(() => {
  service = new Metadata({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Metadata.show', () => {
  it('should request GET /metadata', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'metadata', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Metadata.showVersion', () => {
  it('should request GET /version', async () => {
    await service.showVersion();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'version', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
