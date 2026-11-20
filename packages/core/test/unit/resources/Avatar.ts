import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Avatar } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Avatar;

beforeEach(() => {
  service = new Avatar({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Avatar.show', () => {
  it('should request GET avatar without options', async () => {
    await service.show('a@b.c');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'avatar', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { email: 'a@b.c' },
    });
  });

  it('should request GET avatar with size and sudo', async () => {
    await service.show('a@b.c', { size: 64, sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'avatar', {
      sudo: 'u',
      showExpanded: undefined,
      searchParams: { email: 'a@b.c', size: 64 },
    });
  });
});
