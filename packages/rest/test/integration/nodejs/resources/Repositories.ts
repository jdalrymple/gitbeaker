import { Projects, Repositories } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

let repositoryAPI: InstanceType<typeof Repositories<false>>;
let projectAPI: InstanceType<typeof Projects<false>>;

beforeEach(() => {
  repositoryAPI = new Repositories({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
  projectAPI = new Projects({
    host: GITLAB_URL,
    token: GITLAB_PERSONAL_ACCESS_TOKEN,
  });
});

describe('Repositories.showArchive', () => {
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

  it('should upload a text file', async () => {
    const blob = await repositoryAPI.showArchive(project.id, { sha: 'main', fileType: 'zip' });

    expect(blob).toBeInstanceOf(Blob);
  });
});
