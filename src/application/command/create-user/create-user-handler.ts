
import uuid from 'uuid'
import {EventStore} from "../../../domain/EventStore";
import UserCreated from "../../../domain/user/events/user-created";
import {UserAlreadyExists} from "../../../domain/user/expection/user-already-exists";
import {CreateUserCommandInterface} from "./create-user-command";
import {UserDataRepository} from "../../../domain/types";
import {HandlerInterface} from "../../type";

export class CreateUserHandler implements HandlerInterface {
    private repo: UserDataRepository;
    private eventStore: EventStore;

    constructor({userDataRepository, eventStore}: CreateUserHandlerArgs) {
        this.repo = userDataRepository;
        this.eventStore = eventStore;
    }

    async handle(command: CreateUserCommandInterface) {
        const {username, password} = command;
        console.log(`creating user ${username}`)
        try{
            const existingUser = await this.repo.findByUsername(username);
            throw new UserAlreadyExists(username);
        }catch (e) {
            if (e instanceof UserAlreadyExists)
                throw new UserAlreadyExists(username);
        }
        const userId = uuid.v4();
        await this.eventStore.register(new UserCreated(userId, username, password))

    }

}




interface CreateUserHandlerArgs {
    userDataRepository: UserDataRepository
    eventStore: EventStore
}