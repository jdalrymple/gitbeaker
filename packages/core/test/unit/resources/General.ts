import * as Resources from '../../../src/resources';

describe('Instantiating services', () => {
  it('should create a valid service object for each export', () => {
    Object.entries(Resources).forEach(([k, V]) => {
      const service = new V({
        requesterFn: jest.fn(),
        token: 'abcdefg',
      });

      expect(service.constructor.name).toBe(k);
      expect(service.url).toBeDefined();
      expect(service.authHeaders).toMatchObject({
        'private-token': expect.any(Function),
      });
      expect(service.queryTimeout).toBe(300000);
    });
  });
});
