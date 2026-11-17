import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RunnerControllers } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: RunnerControllers;

beforeEach(() => {
  service = new RunnerControllers({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('RunnerControllers.all', () => {
  it('should request GET /runner_controllers', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runner_controllers', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.create', () => {
  it('should request POST /runner_controllers', async () => {
    await service.create();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'runner_controllers', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /runner_controllers with options', async () => {
    await service.create({ description: 'd', state: 'enabled' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'runner_controllers', {
      body: { description: 'd', state: 'enabled' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.edit', () => {
  it('should request PUT /runner_controllers/1', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'runner_controllers/1', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /runner_controllers/1 with options', async () => {
    await service.edit(1, { state: 'dry_run' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'runner_controllers/1', {
      body: { state: 'dry_run' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.show', () => {
  it('should request GET /runner_controllers/1', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runner_controllers/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.remove', () => {
  it('should request DEL /runner_controllers/1', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'runner_controllers/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.allScopes', () => {
  it('should request GET /runner_controllers/1/scopes', async () => {
    await service.allScopes(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runner_controllers/1/scopes', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('RunnerControllers.addInstanceScope', () => {
  it('should request POST /runner_controllers/1/scopes/instance', async () => {
    await service.addInstanceScope(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'runner_controllers/1/scopes/instance',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('RunnerControllers.removeInstanceScope', () => {
  it('should request DEL /runner_controllers/1/scopes/instance', async () => {
    await service.removeInstanceScope(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'runner_controllers/1/scopes/instance',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('RunnerControllers.addRunnerScope', () => {
  it('should request POST /runner_controllers/1/scopes/runners/2', async () => {
    await service.addRunnerScope(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'runner_controllers/1/scopes/runners/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('RunnerControllers.removeRunnerScope', () => {
  it('should request DEL /runner_controllers/1/scopes/runners/2', async () => {
    await service.removeRunnerScope(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'runner_controllers/1/scopes/runners/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
