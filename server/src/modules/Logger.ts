interface ILogger {
    createLog(message: any, ...args: any[]): void;
}


const Logger: ILogger = {
    createLog: function (message: any, ...args: any[]): void {
        const time = new Date().toUTCString();

        let output = time + ', ' + message;
        if (args && args.length > 0) {
            let stringifiedArgs = '';
            try {
                stringifiedArgs = JSON.stringify(args, null, 2);
            } catch (err) {
                stringifiedArgs = 'Logger error: passed arguments consist errors: ' + err;
            }
            output = output + '\n' + stringifiedArgs;
        }

        return console.log(output);
    },
};

export default Logger;