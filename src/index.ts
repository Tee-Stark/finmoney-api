import app from './app';
import { NODE_ENV, PORT } from './config/constants';
import logger from './config/logger';

const server = app.listen(PORT, () => {
  logger.info(`Server listening on PORT: ${PORT}`);
  logger.info(`Server running in ${NODE_ENV} mode`);
});

export default server;
