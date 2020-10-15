import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { MergeRequests } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: MergeRequests;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new MergeRequests({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating MergeRequests service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(MergeRequests);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('MergeRequests.accept', () => {
  it('should request PUT projects/:id/merge_requests:id/merge', async () => {
    await service.accept(2, 3);

    expect(RequestHelper.put).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/merge',
      undefined,
    );
  });
});

describe('MergeRequests.addSpentTime', () => {
  it('should request POST projects/:id/merge_requests:id/add_spent_time', async () => {
    await service.addSpentTime(2, 3, '10m');

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/add_spent_time',
      {
        duration: '10m',
      },
    );
  });
});

describe('MergeRequests.addTimeEstimate', () => {
  it('should request POST projects/:id/merge_requests:id/add_spent_time', async () => {
    await service.addTimeEstimate(2, 3, '10m');

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/time_estimate',
      {
        duration: '10m',
      },
    );
  });
});

describe('MergeRequests.all', () => {
  it('should request GET /merge_requests', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'merge_requests', {});
  });

  it('should request GET /projects/:id/merge_requests when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/merge_requests', {});
  });

  it('should request GET /group/:id/merge_requests when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/2/merge_requests', {});
  });
});

describe('MergeRequests.cancelOnPipelineSucess', () => {
  it('should request PUT projects/:id/merge_requests/:id/cancel_merge_when_pipeline_succeeds', async () => {
    await service.cancelOnPipelineSucess(2, 3);

    expect(RequestHelper.put).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/cancel_merge_when_pipeline_succeeds',
      undefined,
    );
  });
});

describe('MergeRequests.changes', () => {
  it('should request GET projects/:id/merge_requests/:id/changes', async () => {
    await service.changes(2, 3);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/changes',
      undefined,
    );
  });
});

describe('MergeRequests.closesIssues', () => {
  it('should request GET projects/:id/merge_requests/:id/closes_issues', async () => {
    await service.closesIssues(2, 3);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/closes_issues',
      undefined,
    );
  });
});

describe('MergeRequests.commits', () => {
  it('should request GET projects/:id/merge_requests/:id/commits', async () => {
    await service.commits(2, 3);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/commits',
      undefined,
    );
  });
});

// FIXME: Seems to error out with the correct # of calls but incorrect # recieved
describe.skip('MergeRequests.create', () => {
  it('should request POST projects/:id/merge_requests', async () => {
    await service.create(2, 'dev', 'main', 'Test');

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/2/merge_requests', {
      id: 2,
      sourceBranch: 'dev',
      targetBranch: 'main',
      title: 'Test',
    });
  });
});

describe('MergeRequests.edit', () => {
  it('should request PUT /projects/:id/merge_requests/:iid', async () => {
    await service.edit(1, 2, { title: 'Testing MR' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/1/merge_requests/2', {
      title: 'Testing MR',
    });
  });
});

describe('MergeRequests.participants', () => {
  it('should request GET /projects/:id/merge_requests/:id/participants', async () => {
    await service.participants(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/participants',
      undefined,
    );
  });
});

describe('MergeRequests.pipelines', () => {
  it('should request GET /projects/:id/merge_requests/:id/pipelines', async () => {
    await service.pipelines(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/pipelines',
      undefined,
    );
  });
});

describe('MergeRequests.remove', () => {
  it('should request DEL /projects/:id/merge_requests/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2',
      undefined,
    );
  });
});

describe('MergeRequests.resetSpentTime', () => {
  it('should request POST projects/:id/merge_requests/:iid/reset_spent_time', async () => {
    await service.resetSpentTime(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/reset_spent_time',
      undefined,
    );
  });
});

describe('MergeRequests.resetTimeEstimate', () => {
  it('should request POST projects/:id/merge_requests/:iid/reset_time_estimate', async () => {
    await service.resetTimeEstimate(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/reset_time_estimate',
      undefined,
    );
  });
});

describe('MergeRequests.show', () => {
  it('should request GET /projects/:id/merge_requests/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2',
      undefined,
    );
  });
});

describe('MergeRequests.subscribe', () => {
  it('should request POST projects/:id/merge_requests/:iid/subscribe', async () => {
    await service.subscribe(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/subscribe',
      undefined,
    );
  });
});

describe('MergeRequests.timeStats', () => {
  it('should request GET /projects/:id/merge_requests/:id/time_stats', async () => {
    await service.timeStats(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/time_stats',
      undefined,
    );
  });
});

describe('MergeRequests.version', () => {
  it('should request GET /projects/:id/merge_requests/:id/versions/:id', async () => {
    await service.version(1, 2, 3);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/versions/3',
      undefined,
    );
  });
});

describe('MergeRequests.versions', () => {
  it('should request GET /projects/:id/merge_requests/:id/versions', async () => {
    await service.versions(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/versions',
      undefined,
    );
  });
});

describe('MergeRequests.unsubscribe', () => {
  it('should request DEL projects/:id/merge_requests/:iid/unsubscribe', async () => {
    await service.unsubscribe(2, 3);

    expect(RequestHelper.del).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/unsubscribe',
      undefined,
    );
  });
});
