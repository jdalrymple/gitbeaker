import { Projects } from '../../../src';

describe('Projects.all', () => {
  it('should return an array', async () => {
    const service = new Projects({
      url: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
    const projects = await service.all();

    expect(projects).instanceOf(Array);
  });
});
