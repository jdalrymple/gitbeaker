import { Projects, Repositories } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

let repositoryAPI: InstanceType<typeof Repositories<false>>;

beforeEach(() => {
  repositoryAPI = new Repositories({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Repositories.showArchive', () => {
  const projectAPI = new Projects({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });

  let project: Awaited<ReturnType<typeof projectAPI.create<false>>>;

  beforeAll(async () => {
    project = await projectAPI.create({
      name: `Repositories Integration Test - NodeJS ${TEST_ID}`,
    });

    const blob = new Blob(['TESTING FILE UPLOAD'], {
      type: 'text/plain',
    });

    await projectAPI.upload(project.id, {
      content: blob,
      filename: 'testfile.txt',
    });
  });

  it('should show repository archive in zip format', async () => {
    console.log(project.id);

    const blob = await repositoryAPI.showArchive(project.id, { sha: 'main', fileType: 'zip' });

    expect(blob).toBeInstanceOf(Blob);
  });
});
