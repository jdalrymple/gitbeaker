import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Markdown } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Markdown;

beforeEach(() => {
  service = new Markdown({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Markdown.render', () => {
  it('should request POST /markdown', async () => {
    await service.render('# hi');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'markdown', {
      body: { text: '# hi' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /markdown with options', async () => {
    await service.render('# hi', { gfm: 'true', project: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'markdown', {
      body: { gfm: 'true', project: 1, text: '# hi' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
