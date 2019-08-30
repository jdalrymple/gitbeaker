import { Gitlab as GitlabModule } from '../../../src/core';
import * as Services from '../../../src/core/services';

const { Gitlab: GitlabCommon } = require('../../../src/core');

describe('Instantiating All services', () => {
  it('should create a valid gitlab service object using import', async () => {
    const bundle: GitlabModule = new GitlabModule({
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers(Object.keys(Services));
  });

  it('should create a valid gitlab service object using require', async () => {
    const bundle = new GitlabCommon({
      token: 'abcdefg',
    });

    expect(Object.keys(bundle)).toIncludeAllMembers(Object.keys(Services));
  });
});
