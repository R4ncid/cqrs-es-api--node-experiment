export class UserData {
    readonly userId: string;
    readonly username: string;
    readonly password: string;
    readonly loginCount: number;
    readonly registerAt: Date;
    readonly lastLogin: Date;

    constructor(
        userId: string,
        username:string,
        password:string,
        loginCount:number,
        registerAt: Date,
        lastLogin: Date
        ){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.loginCount = loginCount;
        this.registerAt = registerAt;
        this.lastLogin = lastLogin;

    }
}

