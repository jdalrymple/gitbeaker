import { IssuesStatistics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: IssuesStatistics;

beforeEach(() => {
  service = new IssuesStatistics({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('IssuesStatistics.all', () => {
  it('should request GET /issues_statistics', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/issues_statistics when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/issues_statistics when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/2/issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
