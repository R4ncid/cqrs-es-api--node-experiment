import {LoginCommand} from "./login-command";
import {LoginHandler} from "./login-handler";
import {Emitter} from "../../../domain/EventEmitter";
import {InMemoryEventStore} from "../../../infrastructure/event-store/InMemoryEventStore";
import {InMemoryUserDataRepository} from "../../../infrastructure/repository/user-data-repository/in-memory-user-data-repository";
import {InvalidUserCredentials} from "../../../domain/user/expection/invalid-user-credentials";
import {UserDataProjector} from "../../../infrastructure/repository/user-data-repository/user-data-projector";
import UserCreated from "../../../domain/user/events/user-created";

describe('Login API', () => {


    const buildDependencies = () => {

        const emitter = new Emitter();
        const eventStore = new InMemoryEventStore({emitter});
        const userDataRepository = new InMemoryUserDataRepository();
        const projector = new UserDataProjector({userDataRepository: userDataRepository, emitter});
        const handler = new LoginHandler({eventStore, userDataRepository});
        return {handler, projector, emitter, userDataRepository}
    }


    it('should reject if user not exists', async () => {
        const username = 'username';
        const password = 'password';
        const {handler} = buildDependencies()
        const command = new LoginCommand(username, password);

        try{
            await handler.handle(command);
        }catch (e) {
            expect(e.type).toBe(InvalidUserCredentials.TYPE)
        }
    })

    it('should reject if password is not correct', async () => {
        const username = 'username';
        const password = 'wrongPassword';
        const {handler, projector, emitter} = buildDependencies()
        const command = new LoginCommand(username, password);
        await emitter.emit(new UserCreated('1', username, 'correctPassword'));
        try{
            await handler.handle(command);
            expect(false).toBe(true);
        }catch (e) {
            expect(e.type).toBe(InvalidUserCredentials.TYPE)
        }
    })

    it('should success if password is  correct', async () => {
        const username = 'username';
        const password = 'correctPassword';
        const {handler, emitter} = buildDependencies()
        const command = new LoginCommand(username, password);
        await emitter.emit(new UserCreated('1', username, password));

        try{
            await handler.handle(command);
            expect(true).toBe(true)
        }catch (e) {
            expect(e.type).toBe(InvalidUserCredentials.TYPE)
        }
    })

    it('should increment login count', async () => {
        const username = 'username';
        const password = 'correctPassword';
        const {handler,  emitter, userDataRepository} = buildDependencies()
        const command = new LoginCommand(username, password);
        await emitter.emit(new UserCreated('1', username, password));
        const numberOfLogin = Math.ceil(Math.random() * 10);
        try{
            for(let i = 0; i < numberOfLogin; i++)
                await handler.handle(command);
            process.nextTick(async () => {
                const userData = await userDataRepository.findById('1');

                expect(userData.loginCount).toBe(numberOfLogin);
            })

        }catch (e) {
            expect(e.type).toBe(InvalidUserCredentials.TYPE)
        }
    })

})