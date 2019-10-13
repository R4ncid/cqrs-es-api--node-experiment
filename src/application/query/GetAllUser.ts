import {UserDataRepository} from "../../domain/types";
import {UserData} from "../../domain/user/read-model/user-data";

export class GetAllUser {
    private userDataRepository: UserDataRepository;
    constructor({userDataRepository}:GetAllUserArgs){
        this.userDataRepository = userDataRepository;
    }

    async query(){
        const userData = await this.userDataRepository.getAll();
        return userData.map(({password, ...rest}:UserData) => rest)
    }
}

interface GetAllUserArgs {
    userDataRepository: UserDataRepository
}