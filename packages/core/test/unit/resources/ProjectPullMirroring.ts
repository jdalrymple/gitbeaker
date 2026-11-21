import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectPullMirroring } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectPullMirroring;

beforeEach(() => {
  service = new ProjectPullMirroring({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectPullMirroring.show', () => {
  it('should request GET /projects/:id/mirror/pull', async () => {
    await service.show(1, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});

describe('ProjectPullMirroring.edit', () => {
  it('should request PUT /projects/:id/mirror/pull', async () => {
    await service.edit(1, { url: 'https://x', enabled: true, sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      sudo: 'u',
      showExpanded: true,
      body: { url: 'https://x', enabled: true },
    });
  });

  it('should work without options', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      sudo: undefined,
      showExpanded: undefined,
      body: {},
    });
  });
});

describe('ProjectPullMirroring.start', () => {
  it('should request POST /projects/:id/mirror/pull', async () => {
    await service.start(1, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});
