import {Server} from "./server/server";

export class Application {
    private server: Server;
    constructor({server, projectorsRegistry}:any) {
        this.server = server;
    }

    async start(){
        await this.server.start()
    }

}