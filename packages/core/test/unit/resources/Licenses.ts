import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Licenses } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Licenses;

beforeEach(() => {
  service = new Licenses({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Licenses.all', () => {
  it('should request GET templates/licenses without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'templates/licenses', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: {},
    });
  });

  it('should request GET templates/licenses with popular', async () => {
    await service.all({ popular: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'templates/licenses', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { popular: true },
    });
  });
});

describe('Licenses.show', () => {
  it('should request GET templates/licenses/mit without options', async () => {
    await service.show('mit');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'templates/licenses/mit', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: {},
    });
  });

  it('should request GET templates/licenses/mit with options', async () => {
    await service.show('mit', { project: 'p', fullname: 'f' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'templates/licenses/mit', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { project: 'p', fullname: 'f' },
    });
  });
});
