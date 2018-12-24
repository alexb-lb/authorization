import * as serve from 'inert';

const initialPlugin = <any>{};
initialPlugin.name = 'initialPlugin';
initialPlugin.version = '1.0.0';
initialPlugin.register = async function (server, options) {
    await Promise.all([
        server.register(serve),
    ]);
};

export default initialPlugin;