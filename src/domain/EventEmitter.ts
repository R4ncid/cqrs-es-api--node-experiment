import {DomainEvent} from "./types";
import {Projector} from "../infrastructure/types";
import {EventEmitter} from "events";


const eventEmitter = new EventEmitter()

export class Emitter {

    private projectors: Projector[]

    constructor() {
        this.projectors = []
    }

    emit(event: DomainEvent): void {

        eventEmitter.emit(event.type, event);

        eventEmitter.once(event.type, event =>
            this.projectors.forEach(async (projector: Projector) => {
                try {
                    await projector.project(event);
                } catch (e) {
                    const projectorName: string = typeof (projector)
                    console.error(`projector ${projectorName} failed to update ${event.type}`)
                }
            })
        )
    }

    register(projector: Projector) {
        this.projectors.push(projector);
    }


}