import {CreateUserHandler} from "./create-user-handler";
import {InMemoryUserDataRepository} from "../../../infrastructure/repository/user-data-repository/in-memory-user-data-repository";
import {InMemoryEventStore} from "../../../infrastructure/event-store/InMemoryEventStore";
import {Emitter} from "../../../domain/EventEmitter";
import {CreateUserCommand} from "./create-user-command";
import {UserDataProjector} from "../../../infrastructure/repository/user-data-repository/user-data-projector";
import {UserAlreadyExists} from "../../../domain/user/expection/user-already-exists";

describe('Create User Api', () => {


    const buildHandler = () => {
        const emitter = new Emitter()
        const eventStore = new InMemoryEventStore({emitter});
        const userRepository = new InMemoryUserDataRepository();
        new UserDataProjector({emitter, userDataRepository: userRepository})

        const handler = new CreateUserHandler({eventStore, userDataRepository: userRepository})

        return {handler, userRepository}
    };

    it('should create a user successfully', async () => {

        const {handler} = buildHandler();
        const command = new CreateUserCommand('username', 'password')

        try {
            await handler.handle(command);
            expect(true).toBe(true)
        } catch (e) {
            expect(false).toBe(true)
        }
    })

    it('should create a user successfully and retrieve user', async () => {

        const {handler, userRepository} = buildHandler();
        const username = 'username'
        const command = new CreateUserCommand(username, 'password')

        try {
            await handler.handle(command);
            await new Promise((resolve, reject) => {
                process.nextTick(async () => {
                    try {
                        const user = await userRepository.findByUsername(username)
                        expect(user.username).toBe(username)
                        resolve(user)
                    } catch (e) {
                        expect(false).toBe(true)
                        reject(e);
                    }

                })
            });
        } catch (e) {
            console.error(e);
            expect(false).toBe(true)
        }
    });

    it('should throw UserAlreadyExist if username exists', async () => {
        const {handler, userRepository} = buildHandler();
        const username = 'username'
        const command = new CreateUserCommand(username, 'password')

        try {
            await handler.handle(command);
            await new Promise((resolve, reject) => {
                process.nextTick(async () => {
                    try {
                        await handler.handle(command);
                        expect(false).toBe(true)
                        reject()
                    } catch (e) {

                        expect(e.type).toBe(UserAlreadyExists.TYPE)
                        resolve()
                    }
                })
            });


        } catch (e) {

        }
    });


});