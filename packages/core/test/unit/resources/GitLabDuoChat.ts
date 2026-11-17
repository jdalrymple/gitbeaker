import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GitLabDuoChat } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GitLabDuoChat;

beforeEach(() => {
  service = new GitLabDuoChat({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GitLabDuoChat.completions', () => {
  it('should request POST /chat/completions', async () => {
    await service.completions({
      content: 'hello',
      resource_type: 'issue',
      with_clean_history: true,
      sudo: 'u',
      showExpanded: true,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'chat/completions', {
      body: { content: 'hello', resource_type: 'issue', with_clean_history: true },
      showExpanded: true,
      sudo: 'u',
    });
  });

  it('should pass only content when no other options', async () => {
    await service.completions({ content: 'hi' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'chat/completions', {
      body: { content: 'hi' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
