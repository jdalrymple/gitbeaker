import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MergeRequestDraftNotes } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestDraftNotes;

beforeEach(() => {
  service = new MergeRequestDraftNotes({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('MergeRequestDraftNotes.all', () => {
  it('should request GET projects/1/merge_requests/2/draft_notes without options', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes',
      {
        maxPages: undefined,
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request GET projects/1/merge_requests/2/draft_notes with options', async () => {
    await service.all(1, 2, { perPage: 4, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes',
      {
        maxPages: 2,
        searchParams: { perPage: 4 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.create', () => {
  it('should request POST projects/1/merge_requests/2/draft_notes without options', async () => {
    await service.create(1, 2, 'note');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes',
      {
        body: { note: 'note' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request POST projects/1/merge_requests/2/draft_notes with options', async () => {
    await service.create(1, 2, 'note', { commitId: 'abc', resolveDiscussion: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes',
      {
        body: { commitId: 'abc', resolveDiscussion: true, note: 'note' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.edit', () => {
  it('should request PUT projects/1/merge_requests/2/draft_notes/3', async () => {
    await service.edit(1, 2, 3, { note: 'new' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes/3',
      {
        body: { note: 'new' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.publish', () => {
  it('should request PUT projects/1/merge_requests/2/draft_notes/3/publish', async () => {
    await service.publish(1, 2, 3);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes/3/publish',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.publishBulk', () => {
  it('should request POST projects/1/merge_requests/2/draft_notes/bulk_publish', async () => {
    await service.publishBulk(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes/bulk_publish',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.remove', () => {
  it('should request DEL projects/1/merge_requests/2/draft_notes/3', async () => {
    await service.remove(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes/3',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestDraftNotes.show', () => {
  it('should request GET projects/1/merge_requests/2/draft_notes/3', async () => {
    await service.show(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/draft_notes/3',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
