import * as serve from 'inert';
import IPlugin  from '../IPlugin';

const initialPlugin: IPlugin = {
    name: 'initialPlugin',
    version: '1.0.0',
    register: async function (server, options){
        return await Promise.all([
            server.register(serve),
        ]);
    },
};

export default initialPlugin;