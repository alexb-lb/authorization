// if server runs locally, NODE_ENV variable won't exist, so setting up environment === 'development'
// if server runs via mocha, environment === 'test' (see 'scripts' in package.json)
// if server runs via Heroku.com, environment === 'production' by default
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // "require" automatically converts JSON to object
  let config = require('./config.json');
  let envConfig = config[env];

  // insert constants into environment
  Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key])
}