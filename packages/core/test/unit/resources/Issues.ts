import { Issues } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Issues;

beforeEach(() => {
  service = new Issues({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Issues.addSpentTime', () => {
  it('should request POST projects/:id/issues:id/add_spent_time', async () => {
    await service.addSpentTime(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/add_spent_time',
      {
        body: {
          duration: '10m',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.addTimeEstimate', () => {
  it('should request POST projects/:id/issues:id/add_spent_time', async () => {
    await service.addTimeEstimate(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/2/issues/3/time_estimate',
      {
        body: {
          duration: '10m',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.all', () => {
  it('should request GET /issues', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'issues', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/issues when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/issues', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/issues when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/2/issues', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Issues.edit', () => {
  it('should request PUT /projects/:id/issues/:iid', async () => {
    await service.edit(1, 2, { title: 'Testing terms' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/issues/2', {
      body: {
        title: 'Testing terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Issues.create', () => {
  it('should request POST projects/:id/issues', async () => {
    await service.create(2, 'title', {
      assigneeId: 3,
      description: 'A test issue',
    });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/2/issues', {
      body: {
        title: 'title',
        assigneeId: 3,
        description: 'A test issue',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Issues.allParticipants', () => {
  it('should request GET /projects/:id/issues/:id/participants', async () => {
    await service.allParticipants(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/issues/2/participants',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.remove', () => {
  it('should request DEL /projects/:id/issues/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/issues/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Issues.resetSpentTime', () => {
  it('should request POST projects/:id/issues/:iid/reset_spent_time', async () => {
    await service.resetSpentTime(2, 3);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/2/issues/3/reset_spent_time',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.resetTimeEstimate', () => {
  it('should request POST projects/:id/issues/:iid/reset_time_estimate', async () => {
    await service.resetTimeEstimate(2, 3);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/2/issues/3/reset_time_estimate',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.show', () => {
  it('should request GET /projects/:id/issues/:id', async () => {
    await service.show(1, { projectId: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/issues/1', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Issues.subscribe', () => {
  it('should request POST projects/:id/issues/:iid/subscribe', async () => {
    await service.subscribe(2, 3);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/2/issues/3/subscribe',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.showTimeStats', () => {
  it('should request GET /projects/:id/issues/:id/time_stats', async () => {
    await service.showTimeStats(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/issues/2/time_stats',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Issues.unsubscribe', () => {
  it('should request POST projects/:id/issues/:iid/unsubscribe', async () => {
    await service.unsubscribe(2, 3);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/2/issues/3/unsubscribe',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
