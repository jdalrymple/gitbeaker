import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Organizations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Organizations;

beforeEach(() => {
  service = new Organizations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Organizations.create', () => {
  it('should request POST /organizations with a plain body', async () => {
    await service.create({ name: 'Org', path: 'org', description: 'desc', sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'organizations', {
      body: { name: 'Org', path: 'org', description: 'desc' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });

  it('should request POST /organizations with form data when avatar is given', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.create({
      name: 'Org',
      path: 'org',
      description: 'desc',
      avatar: { content, filename: 'a.jpg' },
    });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'organizations',
      expect.objectContaining({ body: expect.any(FormData) }),
    );

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toMatchObject({
      name: 'Org',
      path: 'org',
      description: 'desc',
      avatar: expect.objectContaining({ size: content.size }),
    });
  });
});
