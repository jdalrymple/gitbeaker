import { RequestHelper } from '../../../src/infrastructure';
import { ExternalStatusChecks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ExternalStatusChecks;

beforeEach(() => {
  service = new ExternalStatusChecks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ExternalStatusChecks.all', () => {
  it('should request GET /projects/:id/external_status_checks', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks',
      {},
    );
  });

  it('should request GET /projects/:id/merge_requests/:idd/status_checks', async () => {
    await service.all(1, { mergerequestIId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/status_checks',
      {},
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
        name: 'name',
        externalUrl: 'url',
      },
    );
  });

  it('should request POST /projects/:id/external_status_checks with options', async () => {
    await service.create(1, 'name', 'url', { protectedBrancheIds: [1, 2] });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks',
      {
        name: 'name',
        externalUrl: 'url',
        protectedBrancheIds: [1, 2],
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
      undefined,
    );
  });

  it('should request PUT /projects/:id/external_status_checks/:idd with options', async () => {
    await service.edit(1, 2, { name: 'name' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/external_status_checks/2',
      { name: 'name' },
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
        sha: 'sha',
        externalStatusCheckId: 3,
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
      undefined,
    );
  });
});
