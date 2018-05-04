import { Projects } from '../../src';

describe('Projects.all', () => {
  it('should return empty array', async () => {
    const service = new Projects({ url: process.env.GITLAB_URL, token: process.env.API_TOKEN });
    const projects = await service.all();

    expect(projects).toEqual([]);
  });
});
