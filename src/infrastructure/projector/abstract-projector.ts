import {Emitter} from "../../domain/EventEmitter";
import {DomainEvent} from "../../domain/types";
import {Projector} from "../types";

export abstract class AbstractProjector implements Projector{

    constructor({emitter}: AbstractProjectorArgs){
        emitter.register(this);
    }

    abstract project(event: DomainEvent): Promise<void>;

    async projectEvents(events: DomainEvent[]): Promise<void[]> {
        return Promise.all(events.map(this.project))
    }

}

export interface AbstractProjectorArgs {
    emitter: Emitter
}
