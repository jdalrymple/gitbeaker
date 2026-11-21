import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectStatistics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectStatistics;

beforeEach(() => {
  service = new ProjectStatistics({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectStatistics.show', () => {
  it('should request GET /projects/1/statistics', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/statistics', undefined);
  });

  it('should request GET /projects/1/statistics with options', async () => {
    await service.show(1, { sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/statistics', {
      sudo: 'u',
    });
  });
});
