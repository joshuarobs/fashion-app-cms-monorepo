import pino from 'pino';

/*
 * All in one file for the setup of the logger
 *
 * Logger levels for pino (based on log4js and bunyan):
 * 10: trace
 * 20: debug
 * 30: info
 * 40: warn
 * 50: error
 * 60: fatal
 */

/**
 * The level of the logger
 * @type {string}
 * @default trace
 */
let level = 'trace';

// Prioritise the set log level via the `LOG_LEVEL` environment variable
if (process.env.LOG_LEVEL) {
  level = process.env.LOG_LEVEL;
}
// Then, check the environment
else if (process.env.NODE_ENV === 'production') {
  level = 'info';
}

const logger = pino({
  level,
  prettyPrint: process.env.NODE_ENV !== 'production',
});
logger.info('Logger initialised with level:', level);
// module.exports = logger;

export { logger };
