import './common/env';
import Server from './common/server';
import routes from './routes';
import { connectDB } from './common/database';
import { config } from '../environment/environment';

connectDB().then(
  () => {
    // Init the seed after the DB connected
    // TODO: Commenting it as it is taking too much memory in build

  },
  () => { }
);

export default new Server()
  .router(routes)
  .listen(parseInt(config.PORT, 10));
