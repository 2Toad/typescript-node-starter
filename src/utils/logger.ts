import {transports, format, createLogger} from 'winston';
import {Slack} from 'slack-winston';
import {vsprintf} from 'sprintf-js';
import * as config from 'config';

const loggerConfig: any = config.get('logger');
const production = process.env.PRODUCTION === 'true';

const getTransports = () => {
  const output = [];

  if (production) {
    const transport = new Slack(Object.assign(loggerConfig.slack, {
      handleExceptions: true,
      level: 'error',
    }));

    output.push(transport);
  } else {
    const customFormat = format.printf(info => {
      return `${info.timestamp} ${info.level}: ${vsprintf(info.message, ...info.splat || [])}`;
    });

    const transport = new transports.Console({
      handleExceptions: production,
      level: production ? 'error' : 'silly',
      format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYMMDD-HHmmss'}),
        format.splat(),
        customFormat
      ),
    });

    output.push(transport);
  }

  return output;
};

export default createLogger({
  exitOnError: () => !production, // exit if not production environment
  transports: getTransports(),
});
