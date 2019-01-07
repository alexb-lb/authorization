import { IRouter } from '../interfaces';
import AuthController from './AuthController';

const AuthRouter: IRouter = async (server) => {
  server.route({
    method: 'POST',
    path: '/',
    handler: (request, h) => AuthController.authenticate(request.payload, h),
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => AuthController.login(request.payload, h),
  });

  server.route({
    method: 'POST',
    path: '/register',
    handler: (request, h) => AuthController.register(request.payload, h),
  });

  server.route({
    method: 'POST',
    path: '/facebook',
    handler: (request, h) => AuthController.authenticateFacebook(request.payload, h),
  });

  server.route({
    method: 'POST',
    path: '/google',
    handler: (request, h) => AuthController.authenticateGoogle(request.payload, h),
  });

  server.route({
    method: 'POST',
    path: '/vkontakte',
    handler: (request, h) => AuthController.authenticateVkontakte(request.payload, h),
  });
}

export default AuthRouter;