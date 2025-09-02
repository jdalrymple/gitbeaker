import { ProjectMarkdownUploads } from '../../../src/resources';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ProjectMarkdownUploads<false>;

beforeEach(() => {
  service = new ProjectMarkdownUploads({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ProjectMarkdownUploads service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ProjectMarkdownUploads);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('projects');
  });
});

describe('ProjectMarkdownUploads.create', () => {
  it('should call the correct url with a resource id and formdata', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });
    const file = { content, filename: 'content.txt' };
    await service.create('5', file);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/uploads', {
      isForm: true,
      file: [file.content, file.filename],
    });
  });
});
