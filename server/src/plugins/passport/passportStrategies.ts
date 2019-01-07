import * as process from 'process'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

// strategies
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {Strategy as GoogleTokenStrategy} from 'passport-google-token';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import * as  VkontakteTokenStrategy from 'passport-vkontakte-token';

module.exports = {
  jwtStrategy: () => {
    const params = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    return new JwtStrategy(params, (payload, done) => {
      // done will be with 2 params: payload and hidden info parameters
      return done(payload);
    });
  },

  facebookStrategy: () => {
    return new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        // callbackURL: process.env.DOMAIN + '/auth/facebook/callback',
        // profileFields: ['id', 'first_name', 'last_name', 'link', 'gender', 'picture', 'verified', 'email', 'birthday']
      }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  },
  
  googleStrategy: () => {
    return new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },(accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
  },

  vkontakteStrategy: () => {
    return new VkontakteTokenStrategy({
      clientID: process.env.VKONTAKTE_CLIENT_ID,
      clientSecret: process.env.VKONTAKTE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    })
  }
};

