import * as  mongoose from 'mongoose';

const DB = {
  connect(uri) {
    // plug in the promise library:
    mongoose.Promise = global.Promise;
  
    mongoose.connect(uri, { useNewUrlParser: true });
    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      process.exit(1);
    });
  }
}

export default DB;