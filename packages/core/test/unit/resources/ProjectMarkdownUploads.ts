import { RequesterFn } from '@gitbeaker/requester-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RequestHelper } from '../../../src/infrastructure';
import { ProjectMarkdownUploads } from '../../../src/resources';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectMarkdownUploads<false>;

beforeEach(() => {
  service = new ProjectMarkdownUploads({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
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

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '5/uploads',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.post() as any).mock.calls[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});
