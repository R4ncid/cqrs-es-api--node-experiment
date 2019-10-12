import {asClass, asFunction, asValue, createContainer} from 'awilix'
import {router, Server} from "./infrastructure/server/server";
import {Router} from "express";
import {Routes} from "./infrastructure/server/routes";
import {UserController} from "./infrastructure/controller/user-controller";
import {GetAllUser} from "./application/query/GetAllUser";
import {UserDataRepository} from "./domain/types";
import {InMemoryUserDataRepository} from "./infrastructure/repository/user-data-repository/in-memory-user-data-repository";
import {Emitter} from "./domain/EventEmitter";
import {EventStore} from "./domain/EventStore";
import {InMemoryEventStore} from "./infrastructure/event-store/InMemoryEventStore";
import {UserDataProjector} from "./infrastructure/repository/user-data-repository/user-data-projector";
import {Application} from "./infrastructure/application";
import {CreateUserHandler} from "./application/command/create-user/create-user-handler";
import {ProjectorsRegistry} from "./infrastructure/projector/projectorsRegistry";
import {LoginHandler} from "./application/command/login/login-handler";

export const container = createContainer();


container.register('app', asClass<Application>(Application).singleton());
container.register('server', asClass<Server>(Server).singleton());
container.register('router', asValue<Router>(router));
container.register('routes', asClass<Routes>(Routes).singleton());
container.register('getAllUser', asClass<GetAllUser>(GetAllUser).singleton());
container.register('createUserHandler', asClass<CreateUserHandler>(CreateUserHandler).singleton());
container.register('loginHandler', asClass<LoginHandler>(LoginHandler).singleton());
container.register('userController', asClass<UserController>(UserController).singleton());
container.register('userDataRepository', asClass<UserDataRepository>(InMemoryUserDataRepository).singleton());
container.register('emitter', asClass<Emitter>(Emitter).singleton());
container.register('eventStore', asClass<EventStore>(InMemoryEventStore).singleton());
container.register('userDataProjector', asClass<UserDataProjector>(UserDataProjector).singleton());
container.register('projectorsRegistry', asClass<ProjectorsRegistry>(ProjectorsRegistry).singleton());
container.register('port', asValue<number>(5000));
