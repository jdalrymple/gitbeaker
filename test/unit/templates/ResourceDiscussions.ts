import { ResourceDiscussions } from '../../../src/core/templates';
import { RequestHelper } from '../../../src/core/infrastructure';

jest.mock('../../../src/core/infrastructure/RequestHelper');
jest.mock('../../../src/core/infrastructure/KyRequester', () => ({
  get: jest.fn(() => []),
  post: jest.fn(() => {}),
  put: jest.fn(() => {}),
}));

let issuesService: ResourceDiscussions;

beforeEach(() => {
  issuesService = new ResourceDiscussions('projects', 'issues', {
    token: 'abcdefg',
  });
});

describe('Instantiating Projects service', () => {
  it('should create a valid service object', async () => {
    expect(issuesService).toBeInstanceOf(ResourceDiscussions);
    expect(issuesService.url).toBeDefined();
    expect(issuesService.rejectUnauthorized).toBeTruthy();
    expect(issuesService.headers).toMatchObject({ 'private-token': 'abcdefg' });
  });
});

describe('ResourceDiscussions.editNote', () => {
  it('should request PUT /projects/:id/issues/:issue_iid/discussions/:discussion_id/notes/:note_id', async () => {
    const projectId = 75159;
    const issueIid = 1;
    const discussionId = 'xxxx';
    const noteId = 11236631;
    const body = 'add note from gitbeaker';

    await issuesService.editNote(projectId, issueIid, discussionId, noteId, body);

    expect(RequestHelper.put).toHaveBeenCalledWith(
      issuesService,
      `${projectId}/issues/${issueIid}/discussions/${discussionId}/notes/${noteId}`,
      {
        body,
      },
    );
  });

  it('should use body property in options', async () => {
    const projectId = 75159;
    const issueIid = 1;
    const discussionId = 'xxxx';
    const noteId = 11236631;
    const body = 'add note from gitbeaker';
    const optionsBody = 'add note from gitbeaker in options';

    await issuesService.editNote(projectId, issueIid, discussionId, noteId, body, {
      hah: 1,
      body: optionsBody,
    });

    expect(RequestHelper.put).toHaveBeenLastCalledWith(
      issuesService,
      `${projectId}/issues/${issueIid}/discussions/${discussionId}/notes/${noteId}`,
      expect.objectContaining({
        body: optionsBody,
      }),
    );
  });
});
