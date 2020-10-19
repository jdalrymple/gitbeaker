import * as ky from 'ky';
import * as fetch from 'node-fetch';
import { Agent } from 'https';
import { processBody, handler, defaultRequest } from '../../src/KyRequester';

// Set globals for testing purposes
if (!global.fetch) {
  global.fetch = fetch;
}

if (!global.Headers) {
  global.Headers = fetch.Headers;
}

jest.mock('ky');

describe('processBody', () => {
  it('should return a json object if type is application/json', async () => {
    const output = await processBody({
      json() {
        return Promise.resolve({ test: 5 });
      },
      headers: {
        get() {
          return 'application/json';
        },
      },
    });

    expect(output).toMatchObject({ test: 5 });
  });

  it('should return a buffer if type is octet-stream, binary, or gzip', async () => {
    const output = [
      processBody({
        blob() {
          return Promise.resolve('test');
        },
        headers: {
          get() {
            return 'application/octet-stream';
          },
        },
      }),
      processBody({
        blob() {
          return Promise.resolve('test');
        },
        headers: {
          get() {
            return 'binary/octet-stream';
          },
        },
      }),
      processBody({
        blob() {
          return Promise.resolve('test');
        },
        headers: {
          get() {
            return 'application/gzip';
          },
        },
      }),
    ];

    const fulfilled = await Promise.all(output);

    fulfilled.forEach((o) => expect(o).toBeInstanceOf(Buffer));
  });

  it('should return a text body given when presented with an unknown content-type', async () => {
    const output = await processBody({
      text() {
        return Promise.resolve('6');
      },
      headers: {
        get() {
          return 'fake';
        },
      },
    });

    expect(output).toBe('6');
  });

  it('should return a empty string when presented with an unknown content-type and undefined body', async () => {
    const output = await processBody({
      text() {
        return Promise.resolve(null);
      },
      headers: {
        get() {
          return 'fake';
        },
      },
    });

    expect(output).toBe('');
  });
});

describe('handler', () => {
  it('should return an error with a description when response has an error prop', async () => {
    ky.mockImplementationOnce(() => {
      const e = {
        response: {
          json() {
            return Promise.resolve({ error: 'msg' });
          },
        },
      };
      return Promise.reject(e);
    });

    await expect(handler('http://test.com', {})).rejects.toContainEntry(['description', 'msg']);
  });

  it('should return an error with a description when response has an message prop', async () => {
    ky.mockImplementationOnce(() => {
      const e = {
        response: {
          json() {
            return Promise.resolve({ message: 'msg' });
          },
        },
      };
      return Promise.reject(e);
    });

    await expect(handler('http://test.com', {})).rejects.toContainEntry(['description', 'msg']);
  });

  it('should return correct properties if request is valid', async () => {
    ky.mockImplementationOnce(() => ({
      status: 404,
      headers: {
        get() {
          return 'application/json';
        },
        entries() {
          return [['token', '1234']];
        },
      },
      json() {
        return Promise.resolve({});
      },
    }));

    const output = await handler('http://test.com', {});

    expect(output).toMatchObject({
      body: {},
      headers: {},
      status: 404,
    });
  });
});

describe('defaultRequest', () => {
  const service = {
    headers: { test: '5' },
    url: 'testurl',
    requestTimeout: 50,
    rejectUnauthorized: true,
  };

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = defaultRequest(service, {
      body: testBody,
    });

    expect(headers).toBeInstanceOf(Headers);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should assign the agent property if given https url and rejectUnauthorized is false', async () => {
    const { agent = {} } = defaultRequest(
      { ...service, url: 'https://test.com', rejectUnauthorized: false },
      { method: 'post' },
    );

    expect(agent).toBeInstanceOf(Agent);
    expect(agent.rejectUnauthorized).toBeFalsy();

    const { agent: agent2 } = defaultRequest(
      { ...service, url: 'https://test.com', rejectUnauthorized: true },
      { method: 'post' },
    );

    expect(agent2).toBeUndefined();

    const { agent: agent3 } = defaultRequest(
      { ...service, url: 'https://test.com' },
      { method: 'post' },
    );

    expect(agent3).toBeUndefined();
  });
});
