import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupPlaceholderReassignments } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupPlaceholderReassignments;

beforeEach(() => {
  service = new GroupPlaceholderReassignments({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupPlaceholderReassignments.all', () => {
  it('should request GET /groups/:id/placeholder_reassignments', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/placeholder_reassignments',
      { asStream: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should pass asStream', async () => {
    await service.all(1, { asStream: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/placeholder_reassignments',
      { asStream: true, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('GroupPlaceholderReassignments.create', () => {
  it('should request POST /groups/:id/placeholder_reassignments with form data', async () => {
    const content = new Blob(['a,b'], { type: 'text/csv' });

    await service.create(1, { content, filename: 'file.csv' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'groups/1/placeholder_reassignments',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});
