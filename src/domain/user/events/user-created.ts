import {DomainEvent} from "../../types";


export default  class UserCreated implements DomainEvent{
    static TYPE:string = 'USER_CREATED';

    readonly payload: UserCreatedPayload;
    readonly type:string;
    readonly occurredAt: Date;

    constructor(userId: string, username: string, password: string){
        this.payload = {
            userId,
            username,
            password
        };
        this.type= UserCreated.TYPE
        this.occurredAt = new Date()
    }

}



export interface UserCreatedPayload {
    userId: string
    username: string
    password: string
}