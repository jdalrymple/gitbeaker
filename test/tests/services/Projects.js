import { Projects } from '../../../src';

const credentials = {
	url: process.env.GITLAB_URL,
	token: process.env.PERSONAL_ACCESS_TOKEN
}

describe('Projects.all', () => {
  it('should return empty array', async () => {
    const service = new Projects(credentials);
    const projects = await service.all();

    expect(projects).toEqual([]);
  });
});
