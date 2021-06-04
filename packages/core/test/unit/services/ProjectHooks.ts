import { RequestHelper } from '../../../src/infrastructure';
import { ProjectHooks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProjectHooks;

beforeEach(() => {
  service = new ProjectHooks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ProjectHooks service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ProjectHooks);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ProjectHooks.all', () => {
  it('should request GET /projects/:id/hooks without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/hooks', undefined);
  });

  it('should request GET /projects/:id/hooks with options', async () => {
    await service.all(1, { test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/hooks', { test: 1 });
  });
});

describe('ProjectHooks.add', () => {
  it('should request POST /projects/:id/hooks', async () => {
    await service.add(1, 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/hooks', {
      url: 'url',
    });
  });
});

describe('ProjectHooks.edit', () => {
  it('should request PUT /projects/:id/hooks/:hook_id', async () => {
    await service.edit(1, 2, 'url');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/hooks/2', { url: 'url' });
  });
});

describe('ProjectHooks.show', () => {
  it('should request GET /projects/:id/hooks/:hook_id without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/hooks/2', undefined);
  });

  it('should request GET /projects/:id/hooks/:hook_id with options', async () => {
    await service.show(1, 2, { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/hooks/2', { sudo: 1 });
  });
});

describe('ProjectHooks.remove', () => {
  it('should request DEL /projects/:id/hooks/:hook_id with options', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/hooks/2', { sudo: 1 });
  });

  it('should request DEL /projects/:id/hooks/:hook_id without options', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/hooks/2', undefined);
  });
});
