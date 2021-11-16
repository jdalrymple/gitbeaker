import FormData from 'form-data';
import { getAPIMap, appendFormFromObject, endpoint } from '../../../src/infrastructure';

jest.mock(
  '../../../dist/map.json',
  () => {
    throw new Error();
  },
  { virtual: true },
);

describe('getAPIMap', () => {
  it('should throw error if file DNE', () => {
    expect(() => {
      getAPIMap();
    }).toThrow();
  });
});

describe('appendFormFromObject', () => {
  it('should convert object key/values to formdata instance', () => {
    const data = { a: 5, b: 'test' };
    const form = appendFormFromObject(data);

    expect(form).toBeInstanceOf(FormData);
  });

  it('should convert object key/values with metadata to formdata instance', () => {
    const data = { a: 5, b: ['test', { filename: 'name.jpg' }] };
    const form = appendFormFromObject(data);

    expect(form).toBeInstanceOf(FormData);
  });
});

describe('endpoint', () => {
  it('should encode parameters correctly', () => {
    const projectId = 1;
    const filePath = 'path/to/file';
    const url = endpoint`/projects/${projectId}/repository/files/${filePath}`;

    expect(url).toBe('/projects/1/repository/files/path%2Fto%2Ffile');
  });

  it('should give error if all parameters are number', () => {
    const projectId = 1;
    // @ts-expect-error No need to use `endpoint` if all parameters are number.
    const url: string = endpoint`/projects/${projectId}`;

    expect(url).toBe('/projects/1');
  });
});
