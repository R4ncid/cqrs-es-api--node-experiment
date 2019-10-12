import {UserDataRepository} from "../../../domain/types";
import {UserData} from "../../../domain/user/read-model/user-data";

export class InMemoryUserDataRepository implements UserDataRepository {

    private store: UserData[];

    constructor() {
        this.store = []
    }

    findById(userId: string): Promise<UserData> {
        return new Promise<UserData>((resolve, reject) => {
            const user = this.store.find((u: UserData) => u.userId === userId);
            if (user instanceof UserData)
                resolve(user);
            else
                reject()
        })

    }


    findByUsername(username: string): Promise<UserData> {
        return new Promise<UserData>((resolve, reject) => {
            const user = this.store.find((u: UserData) => u.username === username);
            if (user instanceof UserData)
                resolve(user);
            else
                reject()
        })
    }


    add(userData: UserData): Promise<UserData> {
        return new Promise<UserData>(resolve => {
            this.store.push(userData);
            resolve(userData)
        })
    }

    async update(userData: UserData): Promise<UserData> {
        await this.findById(userData.userId);
        this.store.forEach((u: UserData, index: number) => {
            if (u.userId === userData.userId) {
                this.store[index] = userData;
            }
        });
        return userData
    }

    async getAll(): Promise<UserData[]> {
        return this.store;
    }

}