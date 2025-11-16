/* eslint-disable */
const { execPromise } = require('@auto-it/core');

module.exports = class LintDocsPlugin {
  constructor() {
    this.name = 'Linting Docs';
  }

  /**
   * Setup the plugin
   *
   * @param {import('@auto-canary/core').default} auto
   */
  apply(auto) {
    auto.hooks.beforeCommitChangelog.tapPromise(this.name, async () => {
      await execPromise('yarn', ['lint:fix']);
      await execPromise('yarn', ['format:fix']);
      await execPromise('git', ['add', '.']);
    });
  }
};
