import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CodeSuggestions } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: CodeSuggestions;

beforeEach(() => {
  service = new CodeSuggestions({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('CodeSuggestions.generateCompletion', () => {
  it('should request POST /code_suggestions/completions', async () => {
    await service.generateCompletion({ fileName: 'a.ts', contentAboveCursor: 'foo' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'code_suggestions/completions', {
      body: { currentFile: { fileName: 'a.ts', contentAboveCursor: 'foo' } },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /code_suggestions/completions with options', async () => {
    await service.generateCompletion(
      { fileName: 'a.ts', contentAboveCursor: 'foo' },
      { intent: 'completion', projectPath: 'g/p', sudo: 'u' },
    );

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'code_suggestions/completions', {
      body: {
        intent: 'completion',
        projectPath: 'g/p',
        currentFile: { fileName: 'a.ts', contentAboveCursor: 'foo' },
      },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('CodeSuggestions.checkEnabled', () => {
  it('should request POST /code_suggestions/enabled', async () => {
    await service.checkEnabled('g/p');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'code_suggestions/enabled', {
      body: { projectPath: 'g/p' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('CodeSuggestions.showDirectAccessDetails', () => {
  it('should request POST /code_suggestions/direct_access', async () => {
    await service.showDirectAccessDetails();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'code_suggestions/direct_access', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('CodeSuggestions.showConnectionDetails', () => {
  it('should request POST /code_suggestions/connection_details', async () => {
    await service.showConnectionDetails();

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'code_suggestions/connection_details',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
