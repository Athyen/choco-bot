const chalk = require('chalk');

exports.log = (content, type = 'log') => {
  switch (type) {
    case 'debug': return console.log(`${chalk.bgMagenta(type.toUpperCase())} ${content}`);
    case 'error': return console.log(`${chalk.bgRed(type.toUpperCase())} ${content}`);
    case 'log': return console.log(`${chalk.bgBlue(type.toUpperCase())} ${content}`);
    case 'ready': return console.log(`${chalk.bgGreen(type.toUpperCase())} ${content}`);
    default: throw new TypeError('Typ loggera przyjmuje następujące wartości: debug, error, log, ready');
  }
};

exports.debug = (...args) => this.log(...args, 'debug');
exports.error = (...args) => this.log(...args, 'error');
exports.ready = (...args) => this.log(...args, 'ready');
