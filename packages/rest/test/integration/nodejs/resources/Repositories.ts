import { Projects, Repositories, RepositoryFiles } from '../../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

const CREDENTIALS = {
  host: GITLAB_URL,
  token: GITLAB_PERSONAL_ACCESS_TOKEN,
};

let repositoryAPI: InstanceType<typeof Repositories<false>>;

beforeEach(() => {
  repositoryAPI = new Repositories(CREDENTIALS);
});

describe('Repositories.showArchive', () => {
  const projectAPI = new Projects(CREDENTIALS);
  const repositoryFilesAPI = new RepositoryFiles(CREDENTIALS);

  let project: Awaited<ReturnType<typeof projectAPI.create<false>>>;

  beforeAll(async () => {
    project = await projectAPI.create({
      name: `Repositories Integration Test - NodeJS ${TEST_ID}`,
    });

    await repositoryFilesAPI.create(
      project.id,
      'testfile.txt',
      'main',
      'TESTING FILE UPLOAD',
      'init commit',
    );
  });

  it('should show repository archive in zip format', async () => {
    const blob = await repositoryAPI.showArchive(project.id, { sha: 'main', fileType: 'zip' });

    expect(blob).toBeInstanceOf(Blob);
  });
});
