import { Projects } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure');

let service: Projects;

beforeEach(() => {
  (<jest.Mock<RequestHelper>>RequestHelper).mockClear();
  service = new Projects({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
    requestHandler: new RequestHelper(),
  });
});

describe('Projects.all', () => {
  it('should request GET /projects', async () => {
    await service.all();

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].get)
      .toHaveBeenCalledWith(service, 'projects', undefined);
  });
});

describe('Projects.archive', () => {
  it('should request POST /projects/:id/archive', async () => {
    await service.archive(12);

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].post)
      .toHaveBeenCalledWith(service, 'projects/12/archive', undefined);
  });

  it('should request POST /projects/:id/archive with sudo', async () => {
    await service.archive(12, { sudo: 2 });

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].post)
      .toHaveBeenCalledWith(service, 'projects/12/archive', { sudo: 2 });
  });
});

describe('Projects.create', () => {
  it('should request POST /projects when userId undefined', async () => {
    await service.create({ title: 'test proj' });

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].post)
      .toHaveBeenCalledWith(service, 'projects', { title: 'test proj' });
  });

  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create({ userId: 2, title: 'test proj' });

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].post)
      .toHaveBeenCalledWith(service, 'projects/user/2', { title: 'test proj' });
  });
});

describe('Projects.edit', () => {
  it('should request PUT /projects', async () => {
    await service.edit(12, { title: 'test proj 2' });

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].put)
      .toHaveBeenCalledWith(service, 'projects/12', { title: 'test proj 2' });
  });
});

describe('Projects.events', () => {
  it('should request GET /projects/:id/events', async () => {
    await service.events(12);

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].get)
      .toHaveBeenCalledWith(service, 'projects/12/events', undefined);
  });
});

describe('Projects.fork', () => {
  it('should request POST /projects/:id/fork', async () => {
    await service.fork(12);

    expect((<jest.Mock<RequestHelper>>RequestHelper).mock.instances[0].post)
      .toHaveBeenCalledWith(service, 'projects/12/fork', undefined);
  });
});
