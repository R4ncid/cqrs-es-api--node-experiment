import {CommandInterface} from "../../type";

export class CreateUserCommand implements CreateUserCommandInterface {
    readonly username: string;
    readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}


export interface CreateUserCommandInterface extends CommandInterface {
    readonly username: string
    readonly password: string
}
