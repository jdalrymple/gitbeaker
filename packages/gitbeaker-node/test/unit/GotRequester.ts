import got from 'got';
import FormData from 'form-data';
import { processBody, handler, defaultRequest } from '../../src/GotRequester';

jest.mock('got');

describe('processBody', () => {
  it('should return a json object if type is application/json', async () => {
    const output = processBody({
      body: JSON.stringify({ test: 5 }),
      headers: { 'content-type': 'application/json' },
    });

    expect(output).toMatchObject({ test: 5 });
  });

  it('should return a empty json object if type is application/json and body length is 0', async () => {
    const output = processBody({
      body: JSON.stringify({}),
      headers: { 'content-type': 'application/json' },
    });

    expect(output).toMatchObject({});
  });

  it('should return a buffer if type is octet-stream, binary, or gzip', async () => {
    const output = [
      processBody({
        body: 'test',
        headers: { 'content-type': 'application/octet-stream' },
      }),
      processBody({
        body: 'test',
        headers: { 'content-type': 'binary/octet-stream' },
      }),
      processBody({
        body: 'test',
        headers: { 'content-type': 'application/gzip' },
      }),
    ];

    output.forEach(o => expect(o).toBeInstanceOf(Buffer));
  });

  it('should return a the exact body given when presented with an unknown content-type', async () => {
    const output = processBody({
      body: 6,
      headers: { 'content-type': 'fake' },
    });

    expect(output).toBe(6);
  });

  it('should return a empty string when presented with an unknown content-type and undefined body', async () => {
    const output = processBody({
      headers: { 'content-type': 'fake' },
    });

    expect(output).toBe('');
  });
});

describe('handler', () => {
  it('should return an error with a description when response has an error prop', async () => {
    got.mockImplementationOnce(() => {
      const e = { response: { body: { error: 'msg' } } };
      return Promise.reject(e);
    });

    await expect(handler('http://test.com', {})).rejects.toStrictEqual({
      description: 'msg',
      response: {
        body: {
          error: 'msg',
        },
      },
    });
  });

  it('should return an error with a description when response has an message prop', async () => {
    got.mockImplementationOnce(() => {
      const e = { response: { body: { message: 'msg' } } };
      return Promise.reject(e);
    });

    await expect(handler('http://test.com', {})).rejects.toStrictEqual({
      description: 'msg',
      response: {
        body: {
          message: 'msg',
        },
      },
    });
  });

  it('should return correct properties if request is valid', async () => {
    got.mockImplementationOnce(() => ({
      statusCode: 404,
      headers: {},
      body: {},
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
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should replace body property with json property if the body type is an object but not FormData', () => {
    const output1 = defaultRequest(service, { body: { key: 1 } });

    expect(output1.body).toBeUndefined();
    expect(output1.json).toMatchObject({ key: 1 });

    const output2 = defaultRequest(service, { body: new FormData() });

    expect(output2.body).toBeInstanceOf(FormData);
    expect(output2.json).toBeUndefined();
  });
});
