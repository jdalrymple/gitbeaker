import { ExternalStatusChecks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ExternalStatusChecks;

beforeEach(() => {
  service = new ExternalStatusChecks({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ExternalStatusChecks.all', () => {
  it('should request GET /projects/:id/external_status_checks', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/external_status_checks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/merge_requests/:idd/status_checks', async () => {
    await service.all(1, { mergerequestIId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/status_checks',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ExternalStatusChecks.create', () => {
  it('should request POST /projects/:id/external_status_checks', async () => {
    await service.create(1, 'name', 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks',
      {
        body: {
          name: 'name',
          externalUrl: 'url',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request POST /projects/:id/external_status_checks with options', async () => {
    await service.create(1, 'name', 'url', { protectedBranchIds: [1, 2] });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks',
      {
        body: {
          name: 'name',
          externalUrl: 'url',
          protectedBranchIds: [1, 2],
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ExternalStatusChecks.edit', () => {
  it('should request PUT /projects/:id/external_status_checks/:idd', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks/2',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request PUT /projects/:id/external_status_checks/:idd with options', async () => {
    await service.edit(1, 2, { name: 'name' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks/2',
      { body: { name: 'name' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ExternalStatusChecks.set', () => {
  it('should request GET /projects/:id/merge_requests/:idd/status_check_responses', async () => {
    await service.set(1, 2, 'sha', 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/status_check_responses',
      {
        body: {
          sha: 'sha',
          externalStatusCheckId: 3,
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ExternalStatusChecks.remove', () => {
  it('should request DEL /projects/:id/external_status_checks/:idd', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
