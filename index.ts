import {container} from "./src/container";
import {Application} from "./src/infrastructure/application";

const app = container.resolve<Application>('app');

app
    .start()
    .then(r => console.log('Application started'))
    .catch(e => console.error(e));
