import { Projects } from '../../../src';

describe('Projects.all', () => {
  it('should return empty array', async () => {
  	const c = { url: process.env.GITLAB_URL, token: process.env.PERSONAL_ACCESS_TOKEN };

  	console.log({t: process.env.TESTS, k: process.env.TESTS2})

    const service = new Projects(c);
    const projects = await service.all();

    expect(projects).toEqual([]);
  });
});
