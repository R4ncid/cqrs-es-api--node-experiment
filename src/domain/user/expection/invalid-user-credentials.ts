import {DomainException} from "../../types";

export class InvalidUserCredentials implements DomainException{
    static TYPE = 'InvalidUserCredentials';

    readonly type:string;

    constructor(){
        this.type = InvalidUserCredentials.TYPE
    }

    message(): string {
        return "Invalid credentials";
    }

}