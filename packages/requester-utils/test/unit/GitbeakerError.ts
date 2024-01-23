import {
  GitbeakerRequestError,
  GitbeakerRetryError,
  GitbeakerTimeoutError,
} from '../../src/GitbeakerError';

describe('GitbeakerRequestError', () => {
  it('should create a custom error with the name "GitbeakerRequestError"', () => {
    const error = new GitbeakerRequestError('my message');

    expect(error.name).toBe('GitbeakerRequestError');
    expect(error).toBeInstanceOf(GitbeakerRequestError);
  });

  it('should accept a message and a cause option', () => {
    const error = new GitbeakerRequestError('my message', {
      cause: {
        description: 'test',
        request: new Request('http://test.url'),
        response: new Response(),
      },
    });

    expect(error.message).toBe('my message');
    expect(error?.cause?.description).toBe('test');
    expect(error.cause?.request).toBeInstanceOf(Request);
    expect(error.cause?.response).toBeInstanceOf(Response);
  });

  it('should accept a message without a cause option', () => {
    const error = new GitbeakerRequestError('my message');

    expect(error.message).toBe('my message');
    expect(error?.cause).toBeUndefined();
  });
});

describe('GitbeakerRetryError', () => {
  it('should create a custom error with the name "GitbeakerRetryError"', () => {
    const error = new GitbeakerRetryError('my message');

    expect(error.name).toBe('GitbeakerRetryError');
    expect(error).toBeInstanceOf(GitbeakerRetryError);
  });

  it('should accept error options', () => {
    const error = new GitbeakerRetryError('my message', { cause: 'reason' });

    expect(error.cause).toBe('reason');
  });
});

describe('GitbeakerTimeoutError', () => {
  it('should create a custom error with the name "GitbeakerTimeoutError"', () => {
    const error = new GitbeakerTimeoutError('my message');

    expect(error.name).toBe('GitbeakerTimeoutError');
    expect(error).toBeInstanceOf(GitbeakerTimeoutError);
  });

  it('should accept error options', () => {
    const error = new GitbeakerTimeoutError('my message', { cause: 'reason' });

    expect(error.cause).toBe('reason');
  });
});
