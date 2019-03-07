import { Projects } from '../../../src';

let service: Projects;

beforeEach(() => {
    service = new Projects({
      host: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
});

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    const p = await service.create({ name: 'Project Integration test' });
    expect(p).toBeInstanceOf(Object);
    expect(p.name).toEqual('Project Integration test');
  });
})
