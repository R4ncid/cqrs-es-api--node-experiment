import {DomainException} from "../../types";

export class UserAlreadyExists implements DomainException{
    private readonly username: string;
    readonly type: string;
    static TYPE: string = 'UserAlreadyExists';

    constructor(username: string) {
        this.username = username;
        this.type = UserAlreadyExists.TYPE
    }

    message(): string {
        return `user ${this.username} already exists`
    }

}