import express, {Router} from 'express'
import bodyParser from 'body-parser'
import {Routes} from "./routes";
export class Server {
    private router: Router;
    private port: number;
    private routes: Routes;

    constructor({router, port, routes}:any){
        this.router = router;
        this.port = port;
        this.routes = routes;

    }

    async start(){
        const app = express();

        app.use(bodyParser.json());
        this.routes.register();
        app.use(this.router);


        app.listen(this.port, () => {
            console.log(`server started on port ${this.port}`)
        })
    }
}

export const router = Router();