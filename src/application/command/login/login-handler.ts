import {LoginCommandInterface} from "./login-command";
import {EventStore} from "../../../domain/EventStore";
import {UserLoggedIn} from "../../../domain/user/events/user-logged-in";
import {InvalidUserCredentials} from "../../../domain/user/expection/invalid-user-credentials";
import {UserDataRepository} from "../../../domain/types";
import {HandlerInterface} from "../../type";

export class LoginHandler implements HandlerInterface {
    private eventStore: EventStore;
    private repo: UserDataRepository;

    constructor({eventStore, userDataRepository}: LoginHandlerArgs){
        this.eventStore = eventStore;
        this.repo = userDataRepository;

    }

    async handle(command: LoginCommandInterface): Promise<void> {
        const {username, password} = command
        try{
            const user = await this.repo.findByUsername(username);

            const isCredentialValid = user.username === username && user.password === password;

            if(!isCredentialValid){
                throw new InvalidUserCredentials();
            }
            await this.eventStore.register(new UserLoggedIn(user.userId))
        }catch (e) {
            throw new InvalidUserCredentials();
        }

    }
}


interface LoginHandlerArgs {
    eventStore: EventStore,
    userDataRepository: UserDataRepository
}