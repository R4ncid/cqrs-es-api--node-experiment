export class LoginCommand implements LoginCommandInterface{
    readonly username: string;
    readonly password: string;

    constructor(username: string, password: string){

        this.username = username;
        this.password = password;

    }
}

export interface LoginCommandInterface {
    readonly username: string,
    readonly password: string
}