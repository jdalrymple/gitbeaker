import FormData from 'form-data';
import { getAPIMap, appendFormFromObject } from '../../../src/infrastructure';

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
