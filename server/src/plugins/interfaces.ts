export interface IServer {
    register?: any,
    route?(
        options: {
            readonly method: string, 
            readonly path: string, 
            handler(request: any, handler: any): any,
        }
    ): void
}

export interface IPlugin {
    readonly plugin?: string,
    readonly name?: string,
    readonly version?: string,
    readonly pkg?: string,
    readonly multiple?: boolean,
    readonly once?: boolean,
    register(server: IServer, options: object): Promise<any>
};

export interface IRouter {
    (server: IServer): void
}