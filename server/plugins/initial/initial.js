const serve = require('inert');

const initialPlugin = {
  name: 'initialPlugin',
  version: '1.0.0',
  register: async (server, options) => {
    await Promise.all([
      server.register(serve),
    ]);
  }
};

module.exports = initialPlugin;