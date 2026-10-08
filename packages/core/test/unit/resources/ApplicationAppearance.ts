import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApplicationAppearance } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ApplicationAppearance;

beforeEach(() => {
  service = new ApplicationAppearance({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ApplicationAppearance.show', () => {
  it('should request GET /application/appearence', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/appearance', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ApplicationAppearance.edit', () => {
  it('should request PUT /application/appearance without arguments', async () => {
    await service.edit();

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /application/appearance with a logo property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ logo: { content, filename: 'test.jpeg' } });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'application/appearance',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      logo: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });

  it('should request PUT /application/appearance with a pwaIcon property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ pwaIcon: { content, filename: 'test.jpeg' } });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'application/appearance',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      pwa_icon: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});
