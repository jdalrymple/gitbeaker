import { MergeRequests } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: MergeRequests;

beforeEach(() => {
  service = new MergeRequests({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
  jest.clearAllMocks();
});

describe('MergeRequests.accept', () => {
  it('should request PUT projects/:id/merge_requests:id/merge', async () => {
    await service.accept(2, 3);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/2/merge_requests/3/merge', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.addSpentTime', () => {
  it('should request POST projects/:id/merge_requests:id/add_spent_time', async () => {
    await service.addSpentTime(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/add_spent_time',
      {
        body: { duration: '10m' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequests.setTimeEstimate', () => {
  it('should request POST projects/:id/merge_requests:id/add_spent_time', async () => {
    await service.setTimeEstimate(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/time_estimate',
      {
        body: { duration: '10m' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequests.all', () => {
  it('should request GET /merge_requests', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'merge_requests', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/merge_requests when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/merge_requests', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/merge_requests when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/merge_requests', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.cancelOnPipelineSuccess', () => {
  it('should request PUT projects/:id/merge_requests/:id/cancel_merge_when_pipeline_succeeds', async () => {
    await service.cancelOnPipelineSuccess(2, 3);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/cancel_merge_when_pipeline_succeeds',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allDiffs', () => {
  it('should request GET projects/:id/merge_requests/:id/diffs', async () => {
    await service.allDiffs(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/merge_requests/3/diffs', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.showChanges', () => {
  it('should request GET projects/:id/merge_requests/:id/changes', async () => {
    await service.showChanges(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/changes',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allIssuesClosed', () => {
  it('should request GET projects/:id/merge_requests/:id/closes_issues', async () => {
    await service.allIssuesClosed(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/closes_issues',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allIssuesRelated', () => {
  it('should request GET projects/:id/merge_requests/:iid/related_issues', async () => {
    await service.allIssuesRelated(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/related_issues',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allCommits', () => {
  it('should request GET projects/:id/merge_requests/:id/commits', async () => {
    await service.allCommits(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/commits',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

// FIXME: Seems to error out with the correct # of calls but incorrect # recieved
describe('MergeRequests.create', () => {
  it('should request POST projects/:id/merge_requests', async () => {
    await service.create(2, 'dev', 'main', 'Test');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/merge_requests', {
      body: { sourceBranch: 'dev', targetBranch: 'main', title: 'Test' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.createPipeline', () => {
  it('should request POST /projects/:id/merge_requests/:id/pipelines', async () => {
    await service.createPipeline(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/pipelines',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.edit', () => {
  it('should request PUT /projects/:id/merge_requests/:iid', async () => {
    await service.edit(1, 2, { title: 'Testing MR' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/merge_requests/2', {
      body: { title: 'Testing MR' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.allParticipants', () => {
  it('should request GET /projects/:id/merge_requests/:id/participants', async () => {
    await service.allParticipants(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/participants',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allPipelines', () => {
  it('should request GET /projects/:id/merge_requests/:id/pipelines', async () => {
    await service.allPipelines(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/pipelines',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.remove', () => {
  it('should request DEL /projects/:id/merge_requests/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/merge_requests/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.resetSpentTime', () => {
  it('should request POST projects/:id/merge_requests/:iid/reset_spent_time', async () => {
    await service.resetSpentTime(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/reset_spent_time',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.resetTimeEstimate', () => {
  it('should request POST projects/:id/merge_requests/:iid/reset_time_estimate', async () => {
    await service.resetTimeEstimate(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/reset_time_estimate',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.show', () => {
  it('should request GET /projects/:id/merge_requests/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/merge_requests/2', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('MergeRequests.subscribe', () => {
  it('should request POST projects/:id/merge_requests/:iid/subscribe', async () => {
    await service.subscribe(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/subscribe',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.showTimeStats', () => {
  it('should request GET /projects/:id/merge_requests/:id/time_stats', async () => {
    await service.showTimeStats(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/time_stats',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.showDiffVersion', () => {
  it('should request GET /projects/:id/merge_requests/:id/versions/:id', async () => {
    await service.showDiffVersion(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/versions/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.allDiffVersions', () => {
  it('should request GET /projects/:id/merge_requests/:id/versions', async () => {
    await service.allDiffVersions(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/versions',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.unsubscribe', () => {
  it('should request DEL projects/:id/merge_requests/:iid/unsubscribe', async () => {
    await service.unsubscribe(2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/unsubscribe',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequests.showReviewers', () => {
  it('should request GET projects/:id/merge_requests/:iid/reviewers', async () => {
    await service.showReviewers(2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/2/merge_requests/3/reviewers',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
