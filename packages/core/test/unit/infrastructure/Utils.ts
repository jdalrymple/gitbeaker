import { appendFormFromObject, endpoint, reformatObjectOptions } from '../../../src/infrastructure';

describe('appendFormFromObject', () => {
  it('should convert object key/values to formdata instance', () => {
    const data = { a: 5, b: 'test' };
    const form = appendFormFromObject(data);

    expect(form).toBeInstanceOf(FormData);
  });

  it('should convert object key/values with metadata to formdata instance', () => {
    const data = {
      a: 5,
      b: [new Blob(['test'], { type: 'text/plain' }), 'name.jpg'],
    };
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
    const url: string = endpoint`/projects/${projectId}`;

    expect(url).toBe('/projects/1');
  });
});

describe('reformatObjectOptions', () => {
  it('should convert simple nested object to be query parameter friendly', () => {
    const data = {
      a: {
        b: 'test',
      },
    };

    const formatted = reformatObjectOptions(data, 'test');

    expect(formatted).toMatchObject({ 'test[a][b]': 'test' });
  });

  it('should convert nested object with "=" characters in the value', () => {
    const data = {
      a: {
        b: '=5',
      },
    };

    const formatted = reformatObjectOptions(data, 'test');

    expect(formatted).toMatchObject({ 'test[a][b]': '=5' });
  });
});
