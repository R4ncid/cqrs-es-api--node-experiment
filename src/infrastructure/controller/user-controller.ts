import {Request, Response} from "express";
import {GetAllUser} from "../../application/query/GetAllUser";
import {CreateUserHandler} from "../../application/command/create-user/create-user-handler";
import {LoginHandler} from "../../application/command/login/login-handler";
import {router} from "../server/server";
import {CreateUserCommand} from "../../application/command/create-user/create-user-command";
import {LoginCommand} from "../../application/command/login/login-command";

export class UserController {

    private getAllUser: GetAllUser;
    private createUserHandler: CreateUserHandler;
    private loginHandler: LoginHandler;

    constructor({getAllUser, createUserHandler, loginHandler}: UserControllerArgs) {
        this.getAllUser = getAllUser;
        this.createUserHandler = createUserHandler;
        this.loginHandler = loginHandler;
    }

    async getAll(req: Request, res: Response) {

        try{
            const users = await this.getAllUser.query()
            res.json(users)
        }catch (e) {
            console.error(e);
            res.status(500).json(e)
        }
    }
    async register(req: Request, res: Response){
        const {username, password} = req.body
        const command = new CreateUserCommand(username, password)
        try{
            await this.createUserHandler.handle(command);
            res.json('user created')
        }catch (e) {
            console.error(e);
            res.status(500).json(e)
        }
    }

    async login(req: Request, res: Response){
        const {username, password} = req.body
        const command = new LoginCommand(username, password)
        try{
            await this.loginHandler.handle(command);
            res.json('user logged in')
        }catch (e) {
            console.error(e);
            res.status(500).json(e)
        }
    }

    router(){
        router.get('/', this.getAll.bind(this));
        router.post('/register', this.register.bind(this));
        router.post('/login', this.login.bind(this));
        return router;
    }
}

interface UserControllerArgs {
    getAllUser: GetAllUser,
    createUserHandler: CreateUserHandler,
    loginHandler: LoginHandler
}