import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import type {
  BlobSchema,
  CondensedGroupSchema,
  IssueSchema,
  SearchCommitSchema,
} from '../../../src';

import { Search } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Search;

beforeEach(() => {
  vi.clearAllMocks();
  service = new Search({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Search.all', () => {
  it('should type repository refs as strings and preserve result types', () => {
    const checkRefTypes = () => {
      const blobs = service.all('blobs', 'query', { projectId: 1, ref: 'feature/search' });
      const commits = service.all('commits', 'query', { projectId: 1, ref: 'v1.0.0' });
      const wiki = service.all('wiki_blobs', 'query', { projectId: 1, ref: 'main' });

      // @ts-expect-error Repository refs must be strings.
      service.all('blobs', 'query', { projectId: 1, ref: 123 });
      // @ts-expect-error Repository refs must be strings.
      service.all('commits', 'query', { projectId: 1, ref: 123 });
      // @ts-expect-error Repository refs must be strings.
      service.all('wiki_blobs', 'query', { projectId: 1, ref: 123 });

      return { blobs, commits, wiki };
    };

    expectTypeOf(checkRefTypes).returns.toEqualTypeOf<{
      blobs: Promise<BlobSchema[]>;
      commits: Promise<SearchCommitSchema[]>;
      wiki: Promise<BlobSchema[]>;
    }>();
  });

  it.each(['feature/search', 'v1.0.0'])('should forward ref %s for blob searches', async (ref) => {
    await service.all('blobs', 'search terms', { projectId: 1, ref });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
      maxPages: undefined,
      searchParams: { scope: 'blobs', search: 'search terms', ref },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it.each(['feature/search', 'v1.0.0'])(
    'should forward ref %s for commit searches',
    async (ref) => {
      await service.all('commits', 'search terms', { projectId: 1, ref });

      expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
        maxPages: undefined,
        searchParams: { scope: 'commits', search: 'search terms', ref },
        showExpanded: undefined,
        sudo: undefined,
      });
    },
  );

  it.each(['feature/search', 'v1.0.0'])('should forward ref %s for wiki searches', async (ref) => {
    await service.all('wiki_blobs', 'search terms', { projectId: 1, ref });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
      maxPages: undefined,
      searchParams: { scope: 'wiki_blobs', search: 'search terms', ref },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /search within the users scope', async () => {
    await service.all('users', 'search terms');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'search', {
      maxPages: undefined,
      searchParams: {
        scope: 'users',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/search when project Id is passed', async () => {
    await service.all('projects', 'search terms', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
      maxPages: undefined,
      searchParams: {
        scope: 'projects',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/search when group Id is passed', async () => {
    await service.all('issues', 'search terms', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/search', {
      maxPages: undefined,
      searchParams: {
        scope: 'issues',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should type the groups and work_items scopes and the documented option values', () => {
    const checkScopeTypes = () => {
      const groups = service.all('groups', 'query');
      const workItems = service.all('work_items', 'query', { type: ['task', 'key_result'] });

      service.all('issues', 'query', { state: 'opened', orderBy: 'title', sort: 'asc' });

      // @ts-expect-error State takes a state, not a scope.
      service.all('issues', 'query', { state: 'issues' });
      // @ts-expect-error Work item types are limited to the documented values.
      service.all('work_items', 'query', { type: ['bug'] });
      // @ts-expect-error Only the title field can be searched.
      service.all('issues', 'query', { fields: ['description'] });

      return { groups, workItems };
    };

    expectTypeOf(checkScopeTypes).returns.toEqualTypeOf<{
      groups: Promise<CondensedGroupSchema[]>;
      workItems: Promise<IssueSchema[]>;
    }>();
  });

  it('should forward the work item filters as searchParams', async () => {
    await service.all('work_items', 'migrate', {
      groupId: 2,
      type: ['task', 'issue'],
      state: 'opened',
      confidential: false,
      includeArchived: true,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/search', {
      maxPages: undefined,
      searchParams: {
        scope: 'work_items',
        search: 'migrate',
        type: ['task', 'issue'],
        state: 'opened',
        confidential: false,
        includeArchived: true,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should forward the advanced search merge request filters as searchParams', async () => {
    await service.all('merge_requests', 'fix', {
      searchType: 'advanced',
      fields: ['title'],
      authorUsername: 'root',
      labelName: ['bug', 'backend'],
      sourceBranch: 'feature',
      not: { targetBranch: 'stable' },
      orderBy: 'title',
      sort: 'desc',
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'search', {
      maxPages: undefined,
      searchParams: {
        scope: 'merge_requests',
        search: 'fix',
        searchType: 'advanced',
        fields: ['title'],
        authorUsername: 'root',
        labelName: ['bug', 'backend'],
        sourceBranch: 'feature',
        not: { targetBranch: 'stable' },
        orderBy: 'title',
        sort: 'desc',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should forward the code search options as searchParams', async () => {
    await service.all('blobs', 'TODO', { regex: true, numContextLines: 2, excludeForks: false });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'search', {
      maxPages: undefined,
      searchParams: {
        scope: 'blobs',
        search: 'TODO',
        regex: true,
        numContextLines: 2,
        excludeForks: false,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
