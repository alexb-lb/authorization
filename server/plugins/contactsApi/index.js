const contactsRouter = require('./ContactsRouter');

const index = {
  name: 'contactsApiPlugin',
  version: '1.0.0',

  register: async (server, options) => {

    await contactsRouter(server);
  }
};

module.exports = index;