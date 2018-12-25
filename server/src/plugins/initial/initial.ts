import * as serve from 'inert';

const initialPlugin: object = {
    name: 'initialPlugin',
    version: '1.0.0',
    register: async function (server: any, options:object): Promise<object>{
        return await Promise.all<object>([
            server.register(serve),
        ]);
    },
};

export default initialPlugin;