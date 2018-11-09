import * as config from 'config';
import logger from './utils/logger';
import app from './app';

const serverConfig: any = config.get('server');
const port = process.env.PORT || serverConfig.api.port;

const server = app.express.listen(port, err => {
  if (err) { throw new Error(err); }
  logger.info(`Server is listening on: ${port}`);
});

export default server;
