import app from './app';
import errorHandler from './errorHandler';

const SHUTDOWN_DELAY_IN_MILLISECONDS = 2000;
const port = process.env.PORT;
let server;

const onShutdown = () => {
  if (server) {
    console.log('Gracefully shutting down server...');
    server.close(err => {
      if (err) {
        return console.error(err);
      }
      process.exit();
    });

    setTimeout(_ => {
      console.error('Forcing server shutdown...')
      process.exit();
    }, SHUTDOWN_DELAY_IN_MILLISECONDS)
  }
}

const startServer = () => {
  if (!port) {
    return;
  }

  server = app.listen(port).on('listening', () => console.log(`Server started on ${port}`));

  errorHandler(onShutdown);
}

startServer();