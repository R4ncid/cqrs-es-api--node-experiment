import {User} from "./user/user";
import {UserData} from "./user/read-model/user-data";

declare interface DomainEvent {
    readonly type: string
    readonly payload: any
    readonly occurredAt: Date
}

declare interface DomainException {
    readonly type:string
    message(): string
}

declare interface UserDataRepository {
    findById(userId: string): Promise<UserData>
    findByUsername(username: string): Promise<UserData>
    add(user: UserData): Promise<UserData>
    update(user:UserData): Promise<UserData>
    getAll():Promise<UserData[]>
}