import type { RequestOptions } from '@gitbeaker/requester-utils';
import {
  GitbeakerRequestError,
  GitbeakerRetryError,
  GitbeakerTimeoutError,
} from '@gitbeaker/requester-utils';
import { getError } from '../utils/index';
import { defaultRequestHandler, processBody } from '../../src/Requester';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('processBody', () => {
  it('should return a json object if type is application/json', async () => {
    const output = await processBody({
      json() {
        return Promise.resolve({ test: 5 });
      },
      headers: new Headers({
        'content-type': 'application/json',
      }),
    } as unknown as Response);

    expect(output).toMatchObject({ test: 5 });
  });

  it('should return a blob if type is octet-stream, binary, or gzip', async () => {
    const blobData = new Blob(['test'], {
      type: 'text/plain',
    });

    const output = [
      processBody({
        blob() {
          return Promise.resolve(blobData);
        },
        headers: new Headers({
          'content-type': 'application/octet-stream',
        }),
      } as unknown as Response),
      processBody({
        blob() {
          return Promise.resolve(blobData);
        },
        headers: new Headers({
          'content-type': 'binary/octet-stream',
        }),
      } as unknown as Response),
      processBody({
        blob() {
          return Promise.resolve(blobData);
        },
        headers: new Headers({
          'content-type': 'image/png',
        }),
      } as unknown as Response),
      processBody({
        blob() {
          return Promise.resolve(blobData);
        },
        headers: new Headers({
          'content-type': 'application/gzip',
        }),
      } as unknown as Response),
    ];

    const fulfilled = await Promise.all(output);

    fulfilled.forEach((o) => expect(o).toBeInstanceOf(Blob));
  });

  it('should return a string if type is text/<subtype>', async () => {
    const output = await processBody({
      text() {
        return Promise.resolve('test');
      },
      headers: new Headers({
        'content-type': 'text/plain',
      }),
    } as unknown as Response);

    expect(typeof output).toBe('string');
    expect(output).toEqual('test');
  });

  it('should return a empty string when presented with an unknown content-type and empty body', async () => {
    const blobData = new Blob(['test'], {
      type: 'plain/text',
    });

    const output = (await processBody({
      blob() {
        return Promise.resolve(blobData);
      },
      headers: new Headers({
        'content-type': 'application/fake',
      }),
    } as unknown as Response)) as Blob;

    expect(output).toBeInstanceOf(Blob);
    expect(output.size).toBe(4);
  });
});

describe('defaultRequestHandler', () => {
  it('should return an error with the statusText as the Error message', async () => {
    const responseContent = { error: 'msg' };

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 501,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Really Bad Error');
    expect(error).toBeInstanceOf(GitbeakerRequestError);
  });

  it('should return an error with the response included in the cause', async () => {
    const responseContent = { error: 'msg' };

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 501,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Really Bad Error');
    expect(error?.cause?.response).toBeInstanceOf(Response);
  });

  it('should return an error with the request included in the cause', async () => {
    const responseContent = { error: 'msg' };

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 501,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Really Bad Error');
    expect(error?.cause?.request).toBeInstanceOf(Request);
  });

  it("should return an error with a description property derived from the response's error property when response is JSON", async () => {
    const responseContent = { error: 'msg' };

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 501,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error?.cause?.description).toBe('msg');
    expect(error).toBeInstanceOf(GitbeakerRequestError);
  });

  it("should return an error with a description property derived from the response's message property when response is JSON", async () => {
    const responseContent = { message: 'msg' };

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 501,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error?.cause?.description).toBe('msg');
    expect(error).toBeInstanceOf(GitbeakerRequestError);
  });

  it('should return an error with the plain response text if response is not JSON', async () => {
    const responseContent = 'Bad things happened';

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(responseContent, {
          status: 500,
          statusText: 'Really Bad Error',
          headers: {
            'content-type': 'text/plain',
          },
        }),
      ),
    );

    const error = await getError<GitbeakerRequestError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error?.cause?.description).toBe(responseContent);
    expect(error).toBeInstanceOf(GitbeakerRequestError);
  });

  it('should return an error with a message "Query timeout was reached" if fetch throws a TimeoutError', async () => {
    class TimeoutError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'TimeoutError';
      }
    }

    mockFetch.mockRejectedValueOnce(new TimeoutError('Hit timeout'));

    const error = await getError<GitbeakerTimeoutError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Query timeout was reached');
    expect(error).toBeInstanceOf(GitbeakerTimeoutError);
  });

  it('should return an error with a message "Query timeout was reached" if fetch throws a AbortError', async () => {
    class AbortError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'AbortError';
      }
    }

    mockFetch.mockRejectedValueOnce(new AbortError('Abort signal triggered'));

    const error = await getError<GitbeakerTimeoutError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Query timeout was reached');
    expect(error).toBeInstanceOf(GitbeakerTimeoutError);
  });

  it('should return an unchanged error if fetch throws an error thats not an AbortError or TimeoutError', async () => {
    class RandomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'RandomError';
      }
    }

    mockFetch.mockRejectedValueOnce(new RandomError('Random Error'));

    const error = await getError<RandomError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe('Random Error');
    expect(error).toBeInstanceOf(RandomError);
  });

  it('should retry request if a 429 retry code is returned', async () => {
    const responseContent = { error: 'msg' };
    const fakeFailedReturnValue = Promise.resolve(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 429,
          statusText: 'Retry Code',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const fakeSuccessfulReturnValue = Promise.resolve(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    mockFetch.mockReturnValue(fakeFailedReturnValue);
    mockFetch.mockReturnValue(fakeSuccessfulReturnValue);

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should retry request if a 502 retry code is returned', async () => {
    const responseContent = { error: 'msg' };
    const fakeFailedReturnValue = Promise.resolve(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 502,
          statusText: 'Retry Code',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const fakeSuccessfulReturnValue = Promise.resolve(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    mockFetch.mockReturnValue(fakeFailedReturnValue);
    mockFetch.mockReturnValue(fakeSuccessfulReturnValue);

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should return a default error if retries are unsuccessful', async () => {
    const responseContent = { error: 'msg' };
    const fakeReturnValue = Promise.resolve(
      Promise.resolve(
        new Response(JSON.stringify(responseContent), {
          status: 429,
          statusText: 'Retry Code',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    mockFetch.mockReturnValue(fakeReturnValue);

    const error = await getError<GitbeakerRetryError>(() =>
      defaultRequestHandler('http://test.com', {} as RequestOptions),
    );

    expect(error.message).toBe(
      'Could not successfully complete this request after 10 retries, last status code: 429. Check the applicable rate limits for this endpoint.',
    );
    expect(error).toBeInstanceOf(GitbeakerRetryError);
  });

  it('should return correct properties if request is valid', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should return correct properties as stream if request is valid', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response('text', {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    const output = await defaultRequestHandler('http://test.com', {
      asStream: true,
    } as RequestOptions);

    expect(output).toMatchObject({
      body: expect.any(ReadableStream),
      headers: { 'content-type': 'application/json' },
      status: 200,
    });

    const outputContent = await new Response(output.body as ReadableStream).text();

    expect(outputContent).toBe('text');
  });

  it('should handle a prefix url correctly', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    await defaultRequestHandler('testurl', {
      prefixUrl: 'http://test.com',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/testurl'), { mode: undefined });

    expect(mockFetch).toHaveBeenCalledWith(request);
  });

  it('should handle a searchParams correctly', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    await defaultRequestHandler('testurl/123', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/testurl/123?test=4'), { mode: undefined });

    expect(mockFetch).toHaveBeenCalledWith(request);
  });

  it('should add same-origin mode for repository/archive endpoint', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    await defaultRequestHandler('http://test.com/repository/archive');

    const request = new Request(new URL('http://test.com/repository/archive'), {
      mode: 'same-origin',
    });

    expect(mockFetch).toHaveBeenCalledWith(request);
  });

  it('should use default mode (cors) for non-repository/archive endpoints', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    await defaultRequestHandler('http://test.com/test/something');

    const request = new Request(new URL('http://test.com/test/something'), { mode: undefined });

    expect(mockFetch).toHaveBeenCalledWith(request);
  });

  it('should handle multipart prefixUrls correctly', async () => {
    mockFetch.mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          statusText: 'Good',
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
    );

    await defaultRequestHandler('testurl/123', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/projects/testurl/123?test=4'), {
      mode: undefined,
    });

    expect(mockFetch).toHaveBeenCalledWith(request);

    await defaultRequestHandler('123/testurl', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects',
    } as RequestOptions);

    const request2 = new Request(new URL('http://test.com/projects/123/testurl?test=4'), {
      mode: undefined,
    });

    expect(mockFetch).toHaveBeenCalledWith(request2);

    await defaultRequestHandler('123/testurl', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects/',
    } as RequestOptions);

    const request3 = new Request(new URL('http://test.com/projects/123/testurl?test=4'), {
      mode: undefined,
    });

    expect(mockFetch).toHaveBeenCalledWith(request3);
  });
});
