import { describe, expect, it } from 'vitest';

import {
  RawPathSegment,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
  normalizeFormData,
  parseLinkHeader,
} from '../../../src/infrastructure';

describe('createFormData', () => {
  it('should convert object key/values to formdata instance', () => {
    const data = { a: 5, b: 'test' };
    const form = createFormData(data);

    expect(form).toBeInstanceOf(FormData);
  });

  it('should convert object key/values with metadata to formdata instance', () => {
    const data = {
      a: 5,
      b: [new Blob(['test'], { type: 'text/plain' }), 'name.jpg'],
    };
    const form = createFormData(data);

    expect(form).toBeInstanceOf(FormData);
  });

  it('should skip null and undefined values', () => {
    const data = { a: 5, b: null, c: undefined, d: 'test' };
    const form = createFormData(data);

    expect(form).toBeInstanceOf(FormData);
    expect(form.has('a')).toBe(true);
    expect(form.has('b')).toBe(false);
    expect(form.has('c')).toBe(false);
    expect(form.has('d')).toBe(true);
  });
});

describe('RawPathSegment', () => {
  it('should store the provided value', () => {
    const value = 'repository/commits';
    const segment = new RawPathSegment(value);

    expect(segment.value).toBe(value);
  });

  it('should return the value when toString is called', () => {
    const value = 'raw/path/with/slashes';
    const segment = new RawPathSegment(value);

    expect(segment.toString()).toBe(value);
  });

  it('should handle empty strings', () => {
    const segment = new RawPathSegment('');

    expect(segment.value).toBe('');
    expect(segment.toString()).toBe('');
  });

  it('should handle special characters without encoding', () => {
    const value = 'path/with spaces & symbols!@#$%';
    const segment = new RawPathSegment(value);

    expect(segment.value).toBe(value);
    expect(segment.toString()).toBe(value);
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

describe('parseLinkHeader', () => {
  it('should parse a link header with next and prev links', () => {
    const linkHeader =
      '<https://api.example.com/page2>; rel="next", <https://api.example.com/page0>; rel="prev"';
    const result = parseLinkHeader(linkHeader);

    expect(result).toEqual({
      next: 'https://api.example.com/page2',
      prev: 'https://api.example.com/page0',
    });
  });

  it('should parse a link header with only next link', () => {
    const linkHeader = '<https://api.example.com/page2>; rel="next"';
    const result = parseLinkHeader(linkHeader);

    expect(result).toEqual({
      next: 'https://api.example.com/page2',
    });
  });

  it('should parse a link header with only prev link', () => {
    const linkHeader = '<https://api.example.com/page0>; rel="prev"';
    const result = parseLinkHeader(linkHeader);

    expect(result).toEqual({
      prev: 'https://api.example.com/page0',
    });
  });

  it('should handle empty link header', () => {
    const result = parseLinkHeader('');

    expect(result).toEqual({});
  });

  it('should handle malformed link header', () => {
    const linkHeader = 'invalid-link-header';
    const result = parseLinkHeader(linkHeader);

    expect(result).toEqual({});
  });

  it('should parse multiple relation types', () => {
    const linkHeader =
      '<https://api.example.com/first>; rel="first", <https://api.example.com/last>; rel="last", <https://api.example.com/next>; rel="next"';
    const result = parseLinkHeader(linkHeader);

    expect(result).toEqual({
      first: 'https://api.example.com/first',
      last: 'https://api.example.com/last',
      next: 'https://api.example.com/next',
    });
  });
});

describe('getPrefixedUrl', () => {
  it('should return suffix when no prefix mapping provided', () => {
    const result = getPrefixedUrl('users');

    expect(result).toBe('users');
  });

  it('should return suffix when empty prefix mapping provided', () => {
    const result = getPrefixedUrl('users', {});

    expect(result).toBe('users');
  });

  it('should return suffix when all prefix values are undefined, or false', () => {
    const result = getPrefixedUrl('users', {
      groupId: undefined,
      adminArea: false,
    });

    expect(result).toBe('users');
  });

  it('should create prefixed URL with single numeric ID', () => {
    const result = getPrefixedUrl('users', { projects: 123 });

    expect(result).toBe('projects/123/users');
  });

  it('should create prefixed URL with single string ID', () => {
    const result = getPrefixedUrl('users', { groups: 'my-group' });

    expect(result).toBe('groups/my-group/users');
  });

  it('should create prefixed URL with boolean true flag', () => {
    const result = getPrefixedUrl('settings', { admin: true });

    expect(result).toBe('admin/settings');
  });

  it('should create prefixed URL with multiple IDs', () => {
    const result = getPrefixedUrl('merge_requests', {
      projects: 123,
      groups: 'my-group',
    });

    expect(result).toBe('projects/123/groups/my-group/merge_requests');
  });

  it('should encode special characters in IDs', () => {
    const result = getPrefixedUrl('issues', { projects: 'group/project name' });

    expect(result).toBe('projects/group%2Fproject%20name/issues');
  });

  it('should mix boolean flags and IDs', () => {
    const result = getPrefixedUrl('statistics', {
      admin: true,
      projects: 456,
    });

    expect(result).toBe('admin/projects/456/statistics');
  });

  it('should filter out false and null values while keeping valid ones', () => {
    const result = getPrefixedUrl('members', {
      admin: false,
      projects: undefined,
      groups: 'valid-group',
      users: 789,
    });

    expect(result).toBe('groups/valid-group/users/789/members');
  });
});

describe('ensureRequiredParams', () => {
  it('should not throw when exactly one parameter is provided (default behavior)', () => {
    const params = { projectId: 123, groupId: null };

    expect(() => ensureRequiredParams(params)).not.toThrow();
  });

  it('should throw when more than one parameter is provided (default behavior)', () => {
    const params = { projectId: 123, groupId: 123 };

    expect(() => ensureRequiredParams(params, { maxExpected: 1 })).toThrow(
      'Too many arguments provided. Expected at most 1 of: projectId, groupId.',
    );
  });

  it('should not throw when required minimum parameters are met', () => {
    const params = { projectId: 123, groupId: 456 };

    expect(() => ensureRequiredParams(params, { minExpected: 1, maxExpected: 2 })).not.toThrow();
  });

  it('should throw error when no parameters are provided', () => {
    const params = { projectId: null, groupId: undefined };

    expect(() => ensureRequiredParams(params)).toThrow(
      'Missing required argument. Please supply a projectId or groupId in the options parameter.',
    );
  });

  it('should throw error when fewer than minimum required parameters', () => {
    const params = { projectId: 123, groupId: null, userId: null };

    expect(() => ensureRequiredParams(params, { minExpected: 2, maxExpected: 3 })).toThrow(
      'Missing required argument. Please supply a projectId or groupId or userId in the options parameter.',
    );
  });

  it('should throw error when more than maximum allowed parameters', () => {
    const params = { projectId: 123, groupId: 456, userId: 456 };

    expect(() => ensureRequiredParams(params, { maxExpected: 2 })).toThrow(
      'Too many arguments provided. Expected at most 2 of: projectId, groupId, userId.',
    );
  });

  it('should handle single parameter validation', () => {
    const params = { token: 'abc123' };

    expect(() => ensureRequiredParams(params)).not.toThrow();
  });

  it('should handle custom min/max ranges', () => {
    const params = { a: 1, b: 2, c: 3 };

    expect(() => ensureRequiredParams(params, { minExpected: 2, maxExpected: 4 })).not.toThrow();
  });

  it('should consider zero and empty string as valid values', () => {
    const params = { count: 0, name: '', id: null };

    expect(() => ensureRequiredParams(params, { minExpected: 2, maxExpected: 3 })).not.toThrow();
  });

  it('should handle empty params object', () => {
    const params = {};

    expect(() => ensureRequiredParams(params)).toThrow(
      'Missing required argument. Please supply a  in the options parameter.',
    );
  });
});

describe('normalizeFormData', () => {
  it('should convert keys to snake_case by default', () => {
    const input = { firstName: 'John', lastName: 'Doe', userId: 123 };
    const result = normalizeFormData(input);

    expect(result).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      user_id: '123',
    });
  });

  it('should preserve keys when decamelizeKeys is false', () => {
    const input = { firstName: 'John', lastName: 'Doe', userId: 123 };
    const result = normalizeFormData(input, { decamelizeKeys: false });

    expect(result).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      userId: '123',
    });
  });

  it('should handle arrays with bracket notation', () => {
    const input = { tags: ['javascript', 'typescript'], items: [1, 2, 3] };
    const result = normalizeFormData(input);

    expect(result).toEqual({
      'tags[0]': 'javascript',
      'tags[1]': 'typescript',
      'items[0]': '1',
      'items[1]': '2',
      'items[2]': '3',
    });
  });

  it('should handle nested objects with index notation', () => {
    const input = {
      user: {
        name: 'John',
        profile: {
          age: 30,
          city: 'New York',
        },
      },
    };
    const result = normalizeFormData(input);

    expect(result).toEqual({
      'user[name]': 'John',
      'user[profile][age]': '30',
      'user[profile][city]': 'New York',
    });
  });

  it('should handle mixed nested structures', () => {
    const input = {
      userDetails: {
        preferences: ['dark', 'notifications'],
        metadata: {
          created: '2023-01-01',
          tags: ['premium', 'verified'],
        },
      },
    };
    const result = normalizeFormData(input);

    expect(result).toEqual({
      'user_details[preferences][0]': 'dark',
      'user_details[preferences][1]': 'notifications',
      'user_details[metadata][created]': '2023-01-01',
      'user_details[metadata][tags][0]': 'premium',
      'user_details[metadata][tags][1]': 'verified',
    });
  });
});
