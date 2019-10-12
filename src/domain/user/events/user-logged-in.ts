import {DomainEvent} from "../../types";

export class UserLoggedIn implements DomainEvent {
    static TYPE = 'USER_LOGGED_IN'

    readonly payload: UserLoginPayload;
    readonly type: string;
    readonly occurredAt: Date;

    constructor(userId: string) {
        this.type = UserLoggedIn.TYPE;
        this.payload = {userId};
        this.occurredAt = new Date()
    }

}

export interface UserLoginPayload {
    userId: string
}