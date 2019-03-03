import { Gitlab as GitlabModule } from '../../../src';
import * as Services from '../../../src/services';

const { Gitlab: GitlabCommon } = require('../../../src');

describe('Instantiating All services', () => {
  it('should create a valid gitlab service object using import', async () => {
  	const bundle = new GitlabModule({
	    token: 'abcdefg',
	});

  	expect(Object.keys(bundle)).toEqual(expect.arrayContaining(Object.keys(Services)));
  });

   it('should create a valid gitlab service object using require', async () => {
  	const bundle = new GitlabCommon({
	    token: 'abcdefg',
	});

  	expect(Object.keys(bundle)).toEqual(expect.arrayContaining(Object.keys(Services)));
  });
});