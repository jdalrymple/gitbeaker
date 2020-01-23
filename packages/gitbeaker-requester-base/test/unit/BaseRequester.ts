import FormData from 'form-data';
import { Agent } from 'https';
import { createInstance, defaultRequest } from '../../src/BaseRequester';

const methods = ['get', 'put', 'delete', 'stream', 'post'];

describe('defaultRequest', () => {
  const service = {
    headers: { test: '5' },
    url: 'testurl',
    rejectUnauthorized: false,
    requestTimeout: 50,
  };

  it('should stringify body if it isnt of type FormData', async () => {
    const testBody = { test: 6 };
    const { body, headers } = defaultRequest(service, {
      body: testBody,
      sudo: '',
      query: {},
      method: '',
    });

    expect(headers).toContainEntry(['content-type', 'application/json']);
    expect(body).toBe(JSON.stringify(testBody));
  });

  it('should not stringify body if it of type FormData', async () => {
    const testBody = new FormData();
    const { body } = defaultRequest(service, { body: testBody, sudo: '', query: {}, method: '' });

    expect(body).toBeInstanceOf(FormData);
  });

  it('should not assign the agent property if given http url', async () => {
    const options = defaultRequest(service, { body: {}, sudo: '', query: {}, method: '' });

    expect(options.agent).toBeUndefined();
  });

  it('should assign the agent property if given https url', async () => {
    const options = defaultRequest(
      { ...service, url: 'https://test.com' },
      { body: {}, sudo: '', query: {}, method: '' },
    );

    expect(options.agent).toBeInstanceOf(Agent);
    expect(options.agent.rejectUnauthorized).toBeFalsy();
  });

  it('should not assign the sudo property if omitted', async () => {
    const { headers } = defaultRequest(service, {
      body: '',
      sudo: undefined,
      query: {},
      method: '',
    });

    expect(headers.sudo).toBeUndefined();
  });

  it('should default searchParams to an empty string if undefined', async () => {
    const { searchParams } = defaultRequest(service, {
      body: '',
      sudo: undefined,
      query: undefined,
      method: '',
    });

    expect(searchParams).toBe('');
  });
});

describe('createInstance', () => {
  const handler = jest.fn();
  const optionsHandler = jest.fn(() => ({}));

  it('should have a createInstance function', async () => {
    expect(createInstance).toBeFunction();
  });

  it('should return an object with function names equal to those in the methods array when the createInstance function is called', async () => {
    const requester = createInstance(optionsHandler, handler);

    expect(requester).toContainAllKeys(methods);

    methods.forEach(m => {
      expect(requester[m]).toBeFunction();
    });
  });

  it('should call the handler with the correct endpoint when passed to any of the method functions', async () => {
    const requester = createInstance(optionsHandler, handler);
    const service = {
      headers: { test: '5' },
      url: 'testurl',
      rejectUnauthorized: false,
      requestTimeout: 50,
    };
    const testEndpoint = 'test endpoint';

    methods.forEach(m => {
      requester[m](service, testEndpoint, {});

      expect(handler).toBeCalledWith(testEndpoint, {});
    });
  });
});
