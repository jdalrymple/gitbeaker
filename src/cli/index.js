const program = require('commander');

const worker = require('./worker');

// eslint-disable-next-line
const packageInfo = require('./../../../package.json');

program.usage(`
  Please check https://github.com/gitlabhq/gitlabhq/tree/master/doc/api and \n
  https://github.com/jdalrymple/node-gitlab/tree/master/src/services to determine the requested options. \n
  For example: \n
  In node-gitlab > User > events(userId, options) \n
  Check https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/events.md#get-user-contribution-events \n
  So usage: gitlab-user events 17 --sort=asc --target_type=issue
`).version(packageInfo.version).option('-c, --config', 'Get config', worker.getConfigCmd);

program.command('url [url]').description("Get or Set url of your gitlab website. Please make sure your settings are 'http' or 'https'.").action(worker.urlCmd);

program.command('token [token]').description('Get or Set token of gitlab').action(worker.tokenCmd);

export default function createCLI(namespace = '') {
  worker.create(namespace);
  program.parse(process.argv);

  if (process.argv.length === 2) {
    program.help();
  }
}
