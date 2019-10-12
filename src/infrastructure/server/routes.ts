import {UserController} from "../controller/user-controller";
import {Router} from "express";

export class Routes {
    private router: Router;
    private userController: UserController;
    constructor({
                    router,
                    userController
                }:any){
        this.router = router;
        this.userController = userController;

    }
    register(){
        this.router.use('/user', this.userController.router())
    }
}