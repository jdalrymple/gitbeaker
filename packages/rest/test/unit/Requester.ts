import type { RequestOptions } from '@gitbeaker/requester-utils';
import { defaultRequestHandler, processBody } from '../../src/Requester';

global.fetch = jest.fn();

const MockFetch = global.fetch as jest.Mock;

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
  it('should return an error with the statusText as the primary message and a description derived from a error property when response has an error property', async () => {
    const stringBody = { error: 'msg' };

    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 501,
        statusText: 'Really Bad Error',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: () => Promise.resolve(stringBody),
        text: () => Promise.resolve(JSON.stringify(stringBody)),
      }),
    );

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message: 'Really Bad Error',
      name: 'GitbeakerRequestError',
      cause: {
        description: 'msg',
      },
    });
  });

  it('should return an error the content of the error message if response is not JSON', async () => {
    const stringBody = 'Bad things happened';

    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 501,
        statusText: 'Really Bad Error',
        headers: new Headers({
          'content-type': 'text/plain',
        }),
        json: () => Promise.resolve(stringBody),
        text: () => Promise.resolve(stringBody),
      }),
    );

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message: 'Really Bad Error',
      name: 'GitbeakerRequestError',
      cause: {
        description: stringBody,
      },
    });
  });

  it('should return an error with a message "Query timeout was reached" if fetch throws a TimeoutError', async () => {
    class TimeoutError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'TimeoutError';
      }
    }

    MockFetch.mockRejectedValueOnce(new TimeoutError('Hit timeout'));

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message: 'Query timeout was reached',
      name: 'GitbeakerTimeoutError',
    });
  });

  it('should return an error with a message "Query timeout was reached" if fetch throws a AbortError', async () => {
    class AbortError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'AbortError';
      }
    }

    MockFetch.mockRejectedValueOnce(new AbortError('Abort signal triggered'));

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message: 'Query timeout was reached',
      name: 'GitbeakerTimeoutError',
    });
  });

  it('should return an unchanged error if fetch throws an error thats not an AbortError or TimeoutError', async () => {
    class RandomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'RandomError';
      }
    }

    MockFetch.mockRejectedValueOnce(new RandomError('Random Error'));

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message: 'Random Error',
      name: 'RandomError',
    });
  });

  it('should retry request if a 429 retry code is returned', async () => {
    const stringBody = { error: 'msg' };
    const fakeFailedReturnValue = Promise.resolve({
      ok: false,
      status: 429,
      statusText: 'Retry Code',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      json: () => Promise.resolve(stringBody),
      text: () => Promise.resolve(JSON.stringify(stringBody)),
    });

    const fakeSuccessfulReturnValue = Promise.resolve({
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(JSON.stringify({})),
      ok: true,
      status: 200,
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });

    // Mock return 10 times
    MockFetch.mockReturnValue(fakeFailedReturnValue);
    MockFetch.mockReturnValue(fakeSuccessfulReturnValue);

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should retry request if a 502 retry code is returned', async () => {
    const stringBody = { error: 'msg' };
    const fakeFailedReturnValue = Promise.resolve({
      ok: false,
      status: 502,
      statusText: 'Retry Code',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      json: () => Promise.resolve(stringBody),
      text: () => Promise.resolve(JSON.stringify(stringBody)),
    });

    const fakeSuccessfulReturnValue = Promise.resolve({
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(JSON.stringify({})),
      ok: true,
      status: 200,
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });

    // Mock return 10 times
    MockFetch.mockReturnValue(fakeFailedReturnValue);
    MockFetch.mockReturnValue(fakeSuccessfulReturnValue);

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should return a default error if retries are unsuccessful', async () => {
    const stringBody = { error: 'msg' };
    const fakeReturnValue = Promise.resolve({
      ok: false,
      status: 429,
      statusText: 'Retry Code',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      json: () => Promise.resolve(stringBody),
      text: () => Promise.resolve(JSON.stringify(stringBody)),
    });

    // Mock return 10 times
    MockFetch.mockReturnValue(fakeReturnValue);

    await expect(defaultRequestHandler('http://test.com', {} as RequestOptions)).rejects.toThrow({
      message:
        'Could not successfully complete this request after 10 retries, last status code: 429. Check the applicable rate limits for this endpoint.',
      name: 'GitbeakerRetryError',
    });

    MockFetch.mockRestore();
  });

  it('should return correct properties if request is valid', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    const output = await defaultRequestHandler('http://test.com', {} as RequestOptions);

    expect(output).toMatchObject({
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should return correct properties as stream if request is valid', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        body: 'text',
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    const output = await defaultRequestHandler('http://test.com', {
      asStream: true,
    } as RequestOptions);

    expect(output).toMatchObject({
      body: 'text',
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  });

  it('should handle a prefix url correctly', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    await defaultRequestHandler('testurl', {
      prefixUrl: 'http://test.com',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/testurl'), { mode: undefined });

    expect(MockFetch).toHaveBeenCalledWith(request);
  });

  it('should handle a searchParams correctly', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    await defaultRequestHandler('testurl/123', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/testurl/123?test=4'), { mode: undefined });

    expect(MockFetch).toHaveBeenCalledWith(request);
  });

  it('should add same-origin mode for repository/archive endpoint', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    await defaultRequestHandler('http://test.com/repository/archive');

    const request = new Request(new URL('http://test.com/repository/archive'), {
      mode: 'same-origin',
    });

    expect(MockFetch).toHaveBeenCalledWith(request);
  });

  it('should use default mode (cors) for non-repository/archive endpoints', async () => {
    MockFetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    await defaultRequestHandler('http://test.com/test/something');

    const request = new Request(new URL('http://test.com/test/something'), { mode: undefined });

    expect(MockFetch).toHaveBeenCalledWith(request);
  });

  it('should handle multipart prefixUrls correctly', async () => {
    MockFetch.mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
      }),
    );

    await defaultRequestHandler('testurl/123', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects',
    } as RequestOptions);

    const request = new Request(new URL('http://test.com/projects/testurl/123?test=4'), {
      mode: undefined,
    });

    expect(MockFetch).toHaveBeenCalledWith(request);

    await defaultRequestHandler('123/testurl', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects',
    } as RequestOptions);

    const request2 = new Request(new URL('http://test.com/projects/123/testurl?test=4'), {
      mode: undefined,
    });

    expect(MockFetch).toHaveBeenCalledWith(request2);

    await defaultRequestHandler('123/testurl', {
      searchParams: 'test=4',
      prefixUrl: 'http://test.com/projects/',
    } as RequestOptions);

    const request3 = new Request(new URL('http://test.com/projects/123/testurl?test=4'), {
      mode: undefined,
    });

    expect(MockFetch).toHaveBeenCalledWith(request3);
  });
});
