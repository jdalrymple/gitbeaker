import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Issues } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

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

const noOpts = { showExpanded: undefined, sudo: undefined };

describe('Issues.allMetricImages', () => {
  it('should request GET /projects/:id/issues/:iid/metric_images', async () => {
    await service.allMetricImages(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/metric_images',
      noOpts,
    );
  });
});

describe('Issues.allRelatedMergeRequests', () => {
  it('should request GET /projects/:id/issues/:iid/related_merge_requests', async () => {
    await service.allRelatedMergeRequests(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/related_merge_requests',
      noOpts,
    );
  });
});

describe('Issues.allClosedByMergeRequestst', () => {
  it('should request GET /projects/:id/issues/:iid/closed_by', async () => {
    await service.allClosedByMergeRequestst(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/closed_by',
      noOpts,
    );
  });
});

describe('Issues.showUserAgentDetails', () => {
  it('should request GET /projects/:id/issues/:iid/user_agent_details', async () => {
    await service.showUserAgentDetails(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/user_agent_details',
      noOpts,
    );
  });
});

describe('Issues.createTodo', () => {
  it('should request POST /projects/:id/issues/:iid/todo', async () => {
    await service.createTodo(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/todo', {
      body: {},
      ...noOpts,
    });
  });
});

describe('Issues.clone', () => {
  it('should request POST /projects/:id/issues/:iid/clone', async () => {
    await service.clone(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/clone', {
      body: { toProjectId: 3 },
      ...noOpts,
    });
  });

  it('should pass withNotes', async () => {
    await service.clone(1, 2, 3, { withNotes: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/clone', {
      body: { withNotes: true, toProjectId: 3 },
      ...noOpts,
    });
  });
});

describe('Issues.move', () => {
  it('should request POST /projects/:id/issues/:iid/move', async () => {
    await service.move(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/move', {
      body: { toProjectId: 3 },
      ...noOpts,
    });
  });
});

describe('Issues.promote', () => {
  it('should request POST /projects/:id/issues/:iid/notes with /promote appended', async () => {
    await service.promote(1, 2, 'comment');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/notes', {
      body: { body: 'comment \n /promote' },
      ...noOpts,
    });
  });

  it('should pass extra options in body', async () => {
    await service.promote(1, 2, 'comment', { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/issues/2/notes', {
      body: { body: 'comment \n /promote' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('Issues.editMetricImage', () => {
  it('should request PUT /projects/:id/issues/:iid/metric_images/:imageId', async () => {
    await service.editMetricImage(1, 2, 3, { url: 'u', urlText: 't' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/metric_images/3',
      { body: { url: 'u', urlText: 't' }, ...noOpts },
    );
  });

  it('should send empty body without options', async () => {
    await service.editMetricImage(1, 2, 3);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/issues/2/metric_images/3',
      { body: {}, ...noOpts },
    );
  });
});

describe('Issues.removeMetricImage', () => {
  it('should request DEL /projects/:id/issues/:iid/metric_images/:imageId', async () => {
    await service.removeMetricImage(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/metric_images/3',
      noOpts,
    );
  });
});

describe('Issues.reorder', () => {
  it('should request PUT /projects/:id/issues/:iid/reorder', async () => {
    await service.reorder(1, 2, { moveAfterId: 4, moveBeforeId: 5 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/issues/2/reorder', {
      body: { moveAfterId: 4, moveBeforeId: 5 },
      ...noOpts,
    });
  });

  it('should send empty body without options', async () => {
    await service.reorder(1, 2);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/issues/2/reorder', {
      body: {},
      ...noOpts,
    });
  });
});

describe('Issues.uploadMetricImage', () => {
  it('should request POST /projects/:id/issues/:iid/metric_images with form data', async () => {
    const content = new Blob(['text'], { type: 'text/plain' });

    await service.uploadMetricImage(1, 2, { content, filename: 'a.png' }, { url: 'u' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/issues/2/metric_images',
      expect.objectContaining({ body: expect.any(FormData), ...noOpts }),
    );

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      url: 'u',
      file: expect.objectContaining({ size: content.size }),
    });
  });
});

describe('Issues.show without projectId', () => {
  it('should request GET /issues/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'issues/1', {
      searchParams: {},
      ...noOpts,
    });
  });
});
