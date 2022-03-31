import express, { Application } from 'express';
import cors from 'cors';
import { IUser } from '../db/models';

// Database
import db from '../db';

// Routes
import { routes} from '../api';

// Add properties to Request
declare module 'express-serve-static-core' {
    interface Request {
        user: IUser
    }
    // tslint:disable-next-line: no-empty-interface
    interface Response {}
}


class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8010';

        // Conectar DB
        this.dbConnection();

        // Middelwares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async dbConnection(): Promise<void> {

        try {
            // Test connection
            await db.authenticate();
            console.log('Database online');

            
            await db.sync();
            //await db.sync({ force: true });

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares(): void {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

    }

    routes(): void {
        
        this.app.use( '/' , routes );
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }

}

export default Server;
