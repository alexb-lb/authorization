export default interface IPlugin {
    readonly name?: string,
    readonly version?: string,
    readonly pkg?: string,
    readonly multiple?: boolean,
    readonly once?: boolean,
    register(server: any, options: object): Promise<any[]>
};
