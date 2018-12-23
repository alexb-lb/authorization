const Contacts = require('./Contacts');

const ContactsRouter = async (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => Contacts.getAll()
  });

  server.route({
    method: 'POST',
    path: '/add',
    handler: (request, h) => Contacts.add(request.payload)
  });

  server.route({
    method: 'POST',
    path: '/{id}/edit',
    handler: (request, h) => Contacts.update(request.payload, request.params.id)
  });

  server.route({
    method: 'POST',
    path: '/{id}/delete',
    handler: (request, h) => Contacts.delete(request.params.id)
  });
};

module.exports = ContactsRouter;