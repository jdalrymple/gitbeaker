import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Runners } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Runners;

beforeEach(() => {
  service = new Runners({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Runners.all', () => {
  it('should request GET /runners/all', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners/all', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/runners', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/runners', async () => {
    await service.all({ groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /runners', async () => {
    await service.all({ owned: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.edit', () => {
  it('should request PUT /runners/:id', async () => {
    await service.edit(2);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'runners/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.enable', () => {
  it('should request POST /projects/:id/runners', async () => {
    await service.enable(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/runners', {
      body: {
        runnerId: 2,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.disable', () => {
  it('should request DELETE /projects/:id/runners/:id', async () => {
    await service.disable(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/runners/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.allJobs', () => {
  it('should request GET /runners/:id/jobs', async () => {
    await service.allJobs(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners/1/jobs', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.remove', () => {
  it('should request DEL /runners/:id', async () => {
    await service.remove({ runnerId: 2 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'runners/2', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DEL /runners with token', async () => {
    await service.remove({ token: 'token' });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'runners', {
      searchParams: { token: 'token' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.show', () => {
  it('should request GET /runners/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

const noOpts = { showExpanded: undefined, sudo: undefined };

describe('Runners.create', () => {
  it('should request POST /runners', async () => {
    await service.create('token');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'runners', {
      body: { token: 'token' },
      ...noOpts,
    });
  });

  it('should include options in body', async () => {
    await service.create('token', { description: 'desc', locked: true });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'runners', {
      body: { description: 'desc', locked: true, token: 'token' },
      ...noOpts,
    });
  });
});

describe('Runners.register', () => {
  it('should request POST /runners', async () => {
    await service.register('token', { description: 'desc' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'runners', {
      body: { description: 'desc', token: 'token' },
      ...noOpts,
    });
  });
});

describe('Runners.verify', () => {
  it('should request POST /runners/verify', async () => {
    await service.verify();

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'runners/verify', {
      body: {},
      ...noOpts,
    });
  });

  it('should pass systemId in body', async () => {
    await service.verify({ systemId: 'sys' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'runners/verify', {
      body: { systemId: 'sys' },
      ...noOpts,
    });
  });
});

describe('Runners.resetRegistrationToken', () => {
  it('should request POST /runners/:id/reset_registration_token', async () => {
    await service.resetRegistrationToken({ runnerId: '3' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'runners/3/reset_registration_token',
      { body: { token: undefined }, ...noOpts },
    );
  });

  it('should request POST /runners/reset_registration_token with token', async () => {
    await service.resetRegistrationToken({ token: 'tok' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'runners/reset_registration_token',
      { body: { token: 'tok' }, ...noOpts },
    );
  });
});

describe('Runners.allManagers', () => {
  it('should request GET /runners/:id/managers', async () => {
    await service.allManagers(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners/1/managers', noOpts);
  });
});

describe('Runners.allGroupRunners', () => {
  it('should request GET /groups/:id/runners', async () => {
    await service.allGroupRunners(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/runners', {
      maxPages: undefined,
      searchParams: {},
      ...noOpts,
    });
  });

  it('should pass search params', async () => {
    await service.allGroupRunners(1, { type: 'group_type', maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/runners', {
      maxPages: 2,
      searchParams: { type: 'group_type' },
      ...noOpts,
    });
  });
});

describe('Runners.resetInstanceRegistrationToken', () => {
  it('should request POST /runners/reset_registration_token', async () => {
    await service.resetInstanceRegistrationToken();

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'runners/reset_registration_token',
      noOpts,
    );
  });
});

describe('Runners.resetProjectRegistrationToken', () => {
  it('should request POST /projects/:id/runners/reset_registration_token', async () => {
    await service.resetProjectRegistrationToken(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/runners/reset_registration_token',
      noOpts,
    );
  });
});

describe('Runners.resetGroupRegistrationToken', () => {
  it('should request POST /groups/:id/runners/reset_registration_token', async () => {
    await service.resetGroupRegistrationToken(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'groups/1/runners/reset_registration_token',
      noOpts,
    );
  });
});

describe('Runners.resetRunnerAuthenticationToken', () => {
  it('should request POST /runners/:id/reset_authentication_token', async () => {
    await service.resetRunnerAuthenticationToken(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'runners/1/reset_authentication_token',
      noOpts,
    );
  });
});

describe('Runners.resetCurrentRunnerAuthenticationToken', () => {
  it('should request POST /runners/reset_authentication_token', async () => {
    await service.resetCurrentRunnerAuthenticationToken();

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'runners/reset_authentication_token',
      noOpts,
    );
  });
});

describe('Runners.discoverJobRouter', () => {
  it('should request GET /runners/router/discovery', async () => {
    await service.discoverJobRouter();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'runners/router/discovery',
      noOpts,
    );
  });
});
