import ky from 'ky';
import { processBody, handler } from '../../src/KyRequester';

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

    fulfilled.forEach(o => expect(o).toBeInstanceOf(Buffer));
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
          return [];
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
