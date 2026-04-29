import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { License } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: License;

beforeEach(() => {
  service = new License({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('License.all', () => {
  it('should request GET licenses', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'licenses', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('License.add', () => {
  it('should request POST license', async () => {
    await service.add('A cool licence');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'license', {
      body: {},
      searchParams: {
        license: 'A cool licence',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('License.show', () => {
  it('should request GET license', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'license', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('License.remove', () => {
  it('should request DELETE license', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'license/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
