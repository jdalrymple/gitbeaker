import 'jest-extended';
import * as Resources from '../../../src/resources';

const { Gitlab, ...resources } = Resources;

describe('Instantiating All resources', () => {
  it('should create a valid gitlab service object using import', () => {
    const bundle = new Gitlab({
      requesterFn: jest.fn(),
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers(Object.keys(resources));
  });
});
