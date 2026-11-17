import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RunnerControllerTokens } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: RunnerControllerTokens;

beforeEach(() => {
  service = new RunnerControllerTokens({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('RunnerControllerTokens.all', () => {
  it('should request GET /runner_controllers/1/tokens', async () => {
    await service.all(1, { perPage: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runner_controllers/1/tokens', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { perPage: 5 },
    });
  });
});

describe('RunnerControllerTokens.create', () => {
  it('should request POST /runner_controllers/1/tokens', async () => {
    await service.create(1, 'desc');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'runner_controllers/1/tokens', {
      sudo: undefined,
      showExpanded: undefined,
      body: { description: 'desc' },
    });
  });
});

describe('RunnerControllerTokens.show', () => {
  it('should request GET /runner_controllers/1/tokens/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runner_controllers/1/tokens/2', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('RunnerControllerTokens.remove', () => {
  it('should request DELETE /runner_controllers/1/tokens/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'runner_controllers/1/tokens/2', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('RunnerControllerTokens.rotate', () => {
  it('should request POST /runner_controllers/1/tokens/2/rotate', async () => {
    await service.rotate(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'runner_controllers/1/tokens/2/rotate',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});
