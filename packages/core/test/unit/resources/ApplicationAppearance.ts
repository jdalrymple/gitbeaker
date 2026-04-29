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
  it('should request PUT /application/appearence without arguments', async () => {
    await service.edit();

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /application/appearence with a logo property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ logo: { content, filename: 'test.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('logo', content, 'test.jpeg');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /application/appearence with a pwaIcon property', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.edit({ pwaIcon: { content, filename: 'test.jpeg' } });

    const expectedFormData = new FormData();
    expectedFormData.append('pwaIcon', content, 'test.jpeg');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/appearance', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
