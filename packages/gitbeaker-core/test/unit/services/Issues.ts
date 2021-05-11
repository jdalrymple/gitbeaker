import { RequestHelper } from '../../../src/infrastructure';
import { Issues } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Issues;

beforeEach(() => {
  service = new Issues({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Issues service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Issues);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Issues.addSpentTime', () => {
  it('should request POST projects/:id/issues:id/add_spent_time', async () => {
    await service.addSpentTime(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/add_spent_time',
      {
        duration: '10m',
      },
    );
  });
});

describe('Issues.addTimeEstimate', () => {
  it('should request POST projects/:id/issues:id/add_spent_time', async () => {
    await service.addTimeEstimate(2, 3, '10m');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/time_estimate',
      {
        duration: '10m',
      },
    );
  });
});

describe('Issues.all', () => {
  it('should request GET /issues', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'issues', {});
  });

  it('should request GET /projects/:id/issues when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/issues', {});
  });

  it('should request GET /group/:id/issues when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/issues', {});
  });
});

describe('Issues.edit', () => {
  it('should request PUT /projects/:id/issues/:iid', async () => {
    await service.edit(1, 2, { title: 'Testing terms' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/issues/2', {
      title: 'Testing terms',
    });
  });
});

describe('Issues.create', () => {
  it('should request POST projects/:id/issues', async () => {
    await service.create(2, {
      title: 'Issue.create Test',
      description: 'A test issue',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/2/issues', {
      title: 'Issue.create Test',
      description: 'A test issue',
    });
  });
});

describe('Issues.link', () => {
  it('should request POST projects/:id/issues/:id/links', async () => {
    await service.link(8, 3, 4, 5);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links', {
      targetProjectId: '4',
      targetIssueIid: '5',
    });
  });
});

describe('Issues.participants', () => {
  it('should request GET /projects/:id/issues/:id/participants', async () => {
    await service.participants(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/participants',
      undefined,
    );
  });
});

describe('Issues.remove', () => {
  it('should request DEL /projects/:id/issues/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/issues/2', undefined);
  });
});

describe('Issues.resetSpentTime', () => {
  it('should request POST projects/:id/issues/:iid/reset_spent_time', async () => {
    await service.resetSpentTime(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/reset_spent_time',
      undefined,
    );
  });
});

describe('Issues.resetTimeEstimate', () => {
  it('should request POST projects/:id/issues/:iid/reset_time_estimate', async () => {
    await service.resetTimeEstimate(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/reset_time_estimate',
      undefined,
    );
  });
});

describe('Issues.show', () => {
  it('should request GET /projects/:id/issues/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/issues/2', undefined);
  });
});

describe('Issues.subscribe', () => {
  it('should request POST projects/:id/issues/:iid/subscribe', async () => {
    await service.subscribe(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/subscribe',
      undefined,
    );
  });
});

describe('Issues.timeStats', () => {
  it('should request GET /projects/:id/issues/:id/time_stats', async () => {
    await service.timeStats(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/issues/2/time_stats',
      undefined,
    );
  });
});

describe('Issues.unsubscribe', () => {
  it('should request POST projects/:id/issues/:iid/unsubscribe', async () => {
    await service.unsubscribe(2, 3);

    expect(RequestHelper.post).toHaveBeenCalledWith(
      service,
      'projects/2/issues/3/unsubscribe',
      undefined,
    );
  });
});
