import {Emitter} from "../../domain/EventEmitter";
import {EventStore} from "../../domain/EventStore";
import {DomainEvent} from "../../domain/types";

export class InMemoryEventStore implements EventStore{

    private store: DomainEvent[];
    private emitter: Emitter;

    constructor({emitter}:any){
        this.emitter = emitter;
        this.store = []
    }

    register(event: DomainEvent): Promise<DomainEvent> {
        return new Promise(resolve => {
            this.store.push(event);
            this.emitter.emit(event);
            resolve(event)
        })
    }

}