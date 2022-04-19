import express from 'express';
import config from './configs/server.config';

import app from './app';

const App = new app();

App.server.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

