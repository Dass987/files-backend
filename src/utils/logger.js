const chalk = require('chalk');
const { inspect } = require('util');

/**
 * Validates the input and returns the inspected output for objects or the input itself for non-object inputs.
 * @param input - The input to be validated.
 * @returns The inspected output for objects or the input itself for non-object inputs.
 */
const validateInput = input => {
  if (input === null || input === undefined) return '';

  if (typeof input === 'object') return inspect(input, { depth: 5, colors: true });

  return input;
};

const logger = {
  neutral: message => console.log(validateInput(message)),
  info: message => console.log(chalk.blue(validateInput(message))),
  processing: message => console.log(chalk.yellow(validateInput(message))),
  success: message => console.log(chalk.green(validateInput(message))),
  warning: message => console.log(chalk.yellowBright(validateInput(message))),
  error: error => console.log(error),
};

module.exports = logger;
