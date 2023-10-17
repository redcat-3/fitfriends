#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './app/cli/cli.js';
import HelpCommand from './app/cli/cli-command/helper.command.js';
import VersionCommand from './app/cli/cli-command/version.command.js';
import FillDbCommand from './app/cli/cli-command/fill-db.command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand(), new VersionCommand(), new FillDbCommand()
]);
myManager.processCommand(process.argv);
