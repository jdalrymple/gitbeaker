import { Gitlab } from '../../../src/core';
import * as Services from '../../../src/core/services';

describe('Instantiating All services', () => {
  it('should create a valid gitlab service object using import', async () => {
    const bundle = new Gitlab({
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers(Object.keys(Services));
  });
});
