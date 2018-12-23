/** Setup environment */
require('../config/config.js');

/** Built-in modules */
const path = require('path');

/** Third-party modules */
const Hapi = require('hapi');

/** Plugins */
const initialPlugin = require('./plugins/initial/initial');

/** Project modules */
const Logger = require('./modules/Logger');

/** Server config defaulting to NODE_ENV or "development" */
const server = Hapi.server({
  port: process.env.HTTP_PORT,
  host: process.env.HOST,
  routes: {files: { relativeTo: path.join(__dirname, '..', 'client','public') }}
});

/** Server init */
const init = async () => {

  // helper initial modules
  await server.register(initialPlugin);

  // static files like images
  server.route({method: 'GET', path: '/images/{file*}', handler: {directory: { path: './images', listing: true }}});
  server.route({method: 'GET', path: '/dist/{file*}', handler: {directory: { path: './dist', listing: true }}});

  // use React router instead of server routing for all of the paths
  // server.route({method: 'GET', path: '/{route*}', handler: (request, h) => h.file('./dist/app.html')});
  server.route({method: 'GET', path: '/{route*}', handler: (request, h) => 'hello world'});

  await server.start();
  Logger.createLog(`Server running at: ${server.info.uri}`);
};
init();

/** Error handlers */
process.on('unhandledRejection', err => {
  Logger.createLog(err);
  process.exit(1);
});

