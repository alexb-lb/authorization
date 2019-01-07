import {IPlugin} from '../interfaces';

import * as passport from 'passport';
import AuthRouter from './AuthRouter';
import * as serve from 'inert';

// passport
const passportStrategies = require('./passportStrategies');

// passport init
passport.initialize();
passport.use("jwt", passportStrategies.jwtStrategy());
passport.use("facebook-token", passportStrategies.facebookStrategy());
passport.use("google-token", passportStrategies.googleStrategy());
passport.use("vkontakte-token", passportStrategies.vkontakteStrategy());

const passportPlugin: IPlugin = {
  name: 'passportPlugin',
  version: '1.0.0',

  register: async (server, options) => {
    await AuthRouter(server);
  }
};

export default passportPlugin;