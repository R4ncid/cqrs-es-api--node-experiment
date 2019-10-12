import {DomainEvent} from "./types";


export interface EventStore {
    register(event:DomainEvent):Promise<DomainEvent>
}
