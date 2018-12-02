import { Projects } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');
jest.mock('got', () => ({
  // This wont work for all cases, but for the tests currently outlined below, it should be fine
  get: jest.fn(() => {
    body: [];
  }),
  post: jest.fn(() => {
    body: {
    }
  }),
  put: jest.fn(() => {
    body: {
    }
  }),
}));

let service: Projects;

beforeEach(() => {
  service = new Projects({
    token: 'abcdefg',
  });
});

describe('Projects.all', () => {
  it('should request GET /projects', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects', undefined);
  });
});

describe('Projects.archive', () => {
  it('should request POST /projects/:id/archive', async () => {
    await service.archive(12);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/12/archive', undefined);
  });

  it('should request POST /projects/:id/archive with sudo', async () => {
    await service.archive(12, { sudo: 2 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/12/archive', {
      sudo: 2,
    });
  });
});

describe('Projects.create', () => {
  it('should request POST /projects when userId undefined', async () => {
    await service.create({ title: 'test proj' });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects', {
      title: 'test proj',
    });
  });

  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create({ userId: 2, title: 'test proj' });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/user/2', {
      title: 'test proj',
    });
  });
});

describe('Projects.edit', () => {
  it('should request PUT /projects', async () => {
    await service.edit(12, { title: 'test proj 2' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'projects/12', {
      title: 'test proj 2',
    });
  });
});

describe('Projects.events', () => {
  it('should request GET /projects/:id/events', async () => {
    await service.events(12);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/12/events', undefined);
  });
});

describe('Projects.fork', () => {
  it('should request POST /projects/:id/fork', async () => {
    await service.fork(12);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/12/fork', undefined);
  });
});
