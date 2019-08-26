const errorHandler = (onShutdown) => {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled rejection at promise: ', p);
    throw reason;
  });

  process.on('uncaughtException', err => {
    console.log('Shutting down due to unhandled error.');
    console.error(err);

    onShutdown();
  });
};

export default errorHandler;
