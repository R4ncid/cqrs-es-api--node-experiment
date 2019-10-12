export class User {
    readonly userId: string;
    readonly username: string;
    private readonly password: string;

    constructor(userId: string, username: string, password: string) {
        this.userId = userId;
        this.username = username;
        this.password = password;
    }

    auth(username: string, password: string): boolean {
        return this.username === username && this.password === password
    }
}

