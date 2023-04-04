import 'reflect-metadata';
import Server from "./app"
import { PostgresDataSource } from './datasources/postgresDatasource';

const main = async () => {
    try {
        const app = new Server();
        await PostgresDataSource.initialize();
        app.listen();
    } catch(error) {
        console.error(error)
    }
}

main();