import { RequestHelper } from '../../../src/infrastructure';
import { Runners } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Runners;

beforeEach(() => {
  service = new Runners({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Runners.all', () => {
  it('should request GET /runners/all', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners/all', {});
  });

  it('should request GET /projects/:id/runners', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/runners', {});
  });

  it('should request GET /groups/:id/runners', async () => {
    await service.all({ groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/runners', {});
  });

  it('should request GET /runners', async () => {
    await service.all({ owned: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners', {});
  });
});

describe('Runners.edit', () => {
  it('should request PUT /runners/:id', async () => {
    await service.edit(2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'runners/2', undefined);
  });
});

describe('Runners.enable', () => {
  it('should request POST /projects/:id/runners', async () => {
    await service.enable(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/runners', {
      runnerId: 2,
    });
  });
});

describe('Runners.disable', () => {
  it('should request DELETE /projects/:id/runners/:id', async () => {
    await service.disable(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/runners/2', undefined);
  });
});

describe('Runners.allJobs', () => {
  it('should request GET /runners/:id/jobs', async () => {
    await service.allJobs(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners/1/jobs', undefined);
  });
});

describe('Runners.remove', () => {
  it('should request DEL /runners/:id', async () => {
    await service.remove({ runnerId: 2 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'runners/2', {});
  });

  it('should request DEL /runners with token', async () => {
    await service.remove({ token: 'token' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'runners', { token: 'token' });
  });
});

describe('Runners.show', () => {
  it('should request GET /runners/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners/1', undefined);
  });
});
