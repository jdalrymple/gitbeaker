/* eslint-disable */

const program = require('commander');

function patchCommander(commander) {
  commander.Command.prototype.forwardSubcommands = function () {
    const self = this;
    const listener = function (args, unknown) {
      // Parse any so-far unknown options
      args = args || [];
      unknown = unknown || [];

      const parsed = self.parseOptions(unknown);
      if (parsed.args.length) args = parsed.args.concat(args);
      unknown = parsed.unknown;

      // Output help if necessary
      if (unknown.includes('--help') || unknown.includes('-h')) {
        self.outputHelp();
        process.exit(0);
      }

      self.parseArgs(args, unknown);
    };

    if (this._args.length > 0) {
      console.error('forwardSubcommands cannot be applied to command with explicit args');
    }

    const parent = this.parent || this;
    const name = parent === this ? '*' : this._name;
    parent.on(`command:${name}`, listener);
    if (this._alias) parent.on(`command:${this._alias}`, listener);
    return this;
  };
}

patchCommander(program);
