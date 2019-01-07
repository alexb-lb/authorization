import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
import * as  moment from 'moment';

import User from '../../models/User'

/**
* Generates token from user object
* @param {_id, name} - generate token with user._id and user.name; 
* @returns {string} - token
*/
const genToken = ({ _id, name }) => {
  const exp = moment().utc().add({ days: 2 }).unix();
  return 'Bearer ' + jwt.sign({ _id, name, exp }, process.env.JWT_SECRET);
};

/**
* Generates token from user object
* @param {_id, name} - generate token with user._id and user.name; 
* @returns {_id, name, token} 
*/
const setUserInfo = ({ _id, name }) => {
  return { _id: _id.toString(), name, token: genToken({ _id, name }) };
};

/**
 * Validate the register form
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains:
 *   boolean validation result,
 *   error message
 *   client side element name where error occurs
 */
const validateRegisterForm = (payload) => {
  const validationResult = {
    success: true,
    message: '',
    errorInElement: ''
  };

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    validationResult.success = false;
    validationResult.message = 'Please provide a correct email address.';
    validationResult.errorInElement = 'email';
    return validationResult;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    validationResult.success = false;
    validationResult.message = 'Password must have at least 8 characters.';
    validationResult.errorInElement = 'password';
    return validationResult;
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    validationResult.success = false;
    validationResult.message = 'Please provide your name.';
    validationResult.errorInElement = 'name';
    return validationResult;
  }

  return validationResult;
};

/**
 * Validate the login form
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains:
 *   boolean validation result,
 *   error message
 *   client side element name where error occurs
 */
const validateLoginForm = (payload) => {
  const validationResult = {
    success: true,
    message: '',
    errorInElement: ''
  };

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    validationResult.success = false;
    validationResult.message = 'Please provide a correct email address.';
    validationResult.errorInElement = 'email';
    return validationResult;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    validationResult.success = false;
    validationResult.message = 'Password must have at least 8 characters.';
    validationResult.errorInElement = 'password';
    return validationResult;
  }

  return validationResult;
};

const AuthController = {

  /**
   * Validate user token user first request to server
   * @param res - get user Authorization bearer token from response object
   *   check if token exists
   *   check if token valid
   *   check if token time not expired
   *
   * @returns
   *   success - boolean
   *   message - server message
   *   user - user info
   *   {success: true, message: "server message", user: {_id, name}}
   */
  authenticate: (req, res) => {
    return passport.authenticate('jwt', { session: false, failWithError: true }, (payload, info) => {
      if (!payload) {
        if (info.name === "TokenExpiredError") {
          return res.status(401).json({ success: false, message: 'Token has expired', errorInElement: false });
        } else {
          console.log('Wrong token error');
          return res.status(401).json({ success: false, message: 'Could not authenticate. Please contact site administration', errorInElement: false });
        }
      }
      return res.status(200).json({ success: true, message: 'OK', user: setUserInfo(payload) });
    }
    )(req, res);
  },

  /**
   * LOGIN method
   * @param {object} payload
   *   get form filed from payload like {email, password}
   *   validate form fields
   *   check if user exists in DB
   *   check if user password equal to password from form field
   * @param {object} h
   *   set cookie "user" with generated token if all is ok,
   *   like {_id, name, token}
   * @returns response with status 200 or 404
   */
  login: async (payload, h) => {
    try {
      const validationResult = validateLoginForm(payload);
      if (!validationResult.success) return h.response(validationResult).code(400);

      let user = await User.findOne({ 'local.email': payload.email });
      if (user === null) return h.response({ success: false, message: 'User not found', errorInElement: false }).code(404);

      let success = await user.comparePassword(payload.password);
      if (success === false) return h.response({ success: false, message: 'Incorrect password', errorInElement: 'password' }).code(400);

      return h.response({ success: true, user: setUserInfo(user) }).code(200);
    } catch (err) {
      // unknown error
      console.log(`Error from local login: `, err);
      return h.reposnse({
        success: false,
        message: 'Could not login',
        errorInElement: false
      }).code(500);
    }
  },

  /**
   * REGISTER method
   * @param {object} payload 
   *   get form filed from payload like {email, password, name}
   *   validate form fields
   *   save user into DB
   * @param {object} h
   *   set data to response "user" with generated token if all is ok,
   *   like {_id, name, token}
   * @returns res with status 200 or 404
   */
  register: async (payload, h) => {
    try {
      // validate  user input
      const validationResult = validateRegisterForm(payload);
      if (!validationResult.success) return h.response(validationResult).code(400);

      const email = payload.email.toLowerCase();
      const password = payload.password.trim();
      const name = payload.name.trim();

      // send back response with error if email already exist
      const emailAlreadyRegistered = await User.findOne({ 'local.email': email });
      if (emailAlreadyRegistered) {
        return h.response({
          success: false,
          message: 'This email is already taken',
          errorInElement: 'email'
        }).code(409);
      }

      // link accounts if same email exists in social network fields
      const registeredUser = await User.findOne({
        $or: [
          { 'facebook.email': email },
          { 'google.email': email },
          { 'vkontakte.email': email }
        ]
      });
      if (registeredUser) {
        registeredUser.local = { email, password };
        const linkedAccounts = await registeredUser.save();
        return h.response({ success: true, user: setUserInfo(linkedAccounts) }).code(200);
      }

      // create new user
      const newUser = { name, local: { email, password } };
      const user = await new User(newUser).save();
      return h.response({ success: true, user: setUserInfo(user) }).code(200);
    } catch (err) {
      // unknown error
      console.log(`Error from local register: `, err);
      return h.response({
        success: false,
        message: 'Could not process the form.',
        errorInElement: false
      }).code(500);
    }
  },

  socialLogin: async (res, { provider, id, token, email, name, avatar }) => {
    try {
      // authorize user if exists
      const authenticatedUser = await User.findOne({ [provider + '.id']: id });
      if (authenticatedUser) return res.status(200).json({ success: true, user: setUserInfo(authenticatedUser) });

      // link accounts if same email exists in local or social fields
      const registeredUser = await User.findOne({
        $or: [
          { 'local.email': email },
          { 'facebook.email': email },
          { 'google.email': email },
          { 'vkontakte.email': email }
        ]
      });
      if (registeredUser) {
        registeredUser[provider] = { id, token, email };
        const linkedAccount = await registeredUser.save();
        return res.status(200).json({ success: true, user: setUserInfo(linkedAccount) })
      }

      // create new user
      const user = await new User({ name, avatar, [provider]: { id, token, email } }).save();
      return res.status(200).json({ success: true, user: setUserInfo(user) })
    } catch (err) {
      console.log(`Error from authentication via ${provider}: `, err);

      return res.status(500).json({
        success: false,
        message: 'Could not authenticate. Please contact site administration',
        errorInElement: false
      });
    }
  },

  /**
   * Authentication via Facebook API
   * Extract token from request header 'access_token'
   *
   * React can't get user's FB token without redirect to FB page, this breaks single-page idea
   * So I grab FB access_token from frontend via facebook button component (Facebook Login API)
   * I decided to use 'passport-facebook-token' module instead of 'passport-facebook' because of needs
   * to handle token from frontend. 'passport-facebook' can't handle extracted access_token
   * Tutorial: https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
   */
  authenticateFacebook: (req, res) => {
    return passport.authenticate('facebook-token', { session: false }, (err, user) => {
      const userInfo = {
        provider: 'facebook',
        token: req.headers.access_token,
        id: user.id,
        email: user.emails[0].value.toLowerCase(),
        name: user.displayName.trim(),
        avatar: user.photos[0].value
      };

      return AuthController.socialLogin(res, userInfo);
    })(req, res);
  },

  authenticateGoogle: (req, res) => {
    return passport.authenticate('google-token', { session: false }, (err, user) => {
      const userInfo = {
        provider: 'google',
        token: req.headers.access_token,
        id: user._json.id,
        email: user._json.email.toLowerCase(),
        name: user._json.name,
        avatar: user._json.picture
      };

      return AuthController.socialLogin(res, userInfo);
    })(req, res);
  },

  authenticateVkontakte: (req, res) => {
    return passport.authenticate('vkontakte-token', { session: false }, (err, user) => {
    })(req, res);
  }
};

export default AuthController;
