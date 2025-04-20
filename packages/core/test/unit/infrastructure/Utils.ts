import {
  RawPathSegment,
  appendFormFromObject,
  endpoint,
  reformatObjectOptions,
} from '../../../src/infrastructure';

describe('appendFormFromObject', () => {
  it('should convert object key/values to formdata instance', () => {
    const data = { a: 5, b: 'test' };
    const form = appendFormFromObject(data);

    expect(form).toBeInstanceOf(FormData);
  });

  it('should convert object key/values with metadata to formdata instance', () => {
    const data = {
      a: 5,
      b: [new Blob(['test'], { type: 'text/plain' }), 'name.jpg'],
    };
    const form = appendFormFromObject(data);

    expect(form).toBeInstanceOf(FormData);
  });
});

describe('endpoint', () => {
  it('should URL-encode slashes in standard string template literal values', () => {
    const projectPath = 'group/project';
    const filePath = 'path/to/file';
    const url = endpoint`/projects/${projectPath}/repository/files/${filePath}`;

    expect(url).toBe('/projects/group%2Fproject/repository/files/path%2Fto%2Ffile');
  });

  it('should handle numeric parameters', () => {
    const projectId = 1;
    const url: string = endpoint`/projects/${projectId}`;

    expect(url).toBe('/projects/1');
  });

  it('should skip encoding for RawPathSegment parameters', () => {
    const projectId = 123;
    // Simulate the internal path used by CommitDiscussions
    const repoPath = new RawPathSegment('repository/commits');
    const commitSha = 'abcdef123';
    const url = endpoint`/projects/${projectId}/${repoPath}/${commitSha}`;

    // Expect 'repository/commits' to be present literally, not 'repository%2Fcommits'
    expect(url).toBe('/projects/123/repository/commits/abcdef123');
  });

  it('should apply encoding rules correctly for mixed parameter types', () => {
    const projectPath = 'group/project'; // Should be encoded
    const rawSegment = new RawPathSegment('raw/path'); // Should not be encoded
    const finalId = 456;
    const url = endpoint`/projects/${projectPath}/something/${rawSegment}/items/${finalId}`;

    expect(url).toBe('/projects/group%2Fproject/something/raw/path/items/456');
  });
});

describe('reformatObjectOptions', () => {
  it('should convert simple nested object to be query parameter friendly', () => {
    const data = {
      a: {
        b: 'test',
      },
    };

    const formatted = reformatObjectOptions(data, 'test');

    expect(formatted).toMatchObject({ 'test[a][b]': 'test' });
  });

  it('should convert nested object with "=" characters in the value', () => {
    const data = {
      a: {
        b: '=5',
      },
    };

    const formatted = reformatObjectOptions(data, 'test');

    expect(formatted).toMatchObject({ 'test[a][b]': '=5' });
  });
});
