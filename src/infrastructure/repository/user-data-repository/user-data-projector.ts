import {DomainEvent, UserDataRepository} from "../../../domain/types";
import {Emitter} from "../../../domain/EventEmitter";
import {AbstractProjector, AbstractProjectorArgs} from "../../projector/abstract-projector";
import UserCreated from "../../../domain/user/events/user-created";
import {User} from "../../../domain/user/user";
import {UserData} from "../../../domain/user/read-model/user-data";
import {UserLoggedIn} from "../../../domain/user/events/user-logged-in";

export class UserDataProjector extends AbstractProjector{
    private userRepository: UserDataRepository;

    constructor({emitter, userDataRepository}: UserProjectorArgs){
        super({emitter})
        this.userRepository = userDataRepository;
    }


     project(event: DomainEvent): Promise<void> {
       return new Promise<void>(async (resolve, reject) => {

                if(event instanceof UserCreated) {
                    const {userId, username, password} = event.payload
                    await this.userRepository.add(new UserData(userId, username, password, 0, event.occurredAt, new Date(), event.occurredAt))
                }else if(event instanceof UserLoggedIn){
                    const {userId} = event.payload
                    const {username, loginCount, password, registerAt} = await this.userRepository.findById(userId)
                    const updateUserData = new UserData(userId, username, password,loginCount + 1, registerAt, new Date(), event.occurredAt)
                    await this.userRepository.update(updateUserData);
                }

       })
    }

}


interface UserProjectorArgs extends AbstractProjectorArgs {
    userDataRepository: UserDataRepository
}

