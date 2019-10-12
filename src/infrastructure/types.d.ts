import {DomainEvent} from "../domain/types";

declare interface Projector {

    project(event: DomainEvent): Promise<void>

    projectEvents(events: DomainEvent[]): Promise<void[]>
}