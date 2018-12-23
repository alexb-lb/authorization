const Logger = {
  createLog(message, ...args) {
    const time = new Date().toGMTString();

    let output = time + ', ' + message;
    if (args && args.length > 0) {
      let stringifiedArgs = '';
      try {
        stringifiedArgs = JSON.stringify(args, null, 2);
      } catch (err){
        stringifiedArgs = 'Logger error: passed arguments consist errors: ' + err;
      }
      output = output + '\n' + stringifiedArgs;
    }

    return console.log(output);
  }
};

module.exports = Logger;