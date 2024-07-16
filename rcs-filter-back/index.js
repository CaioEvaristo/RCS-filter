import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import {connect} from './config/mongo.js';
import enviroment from './config/enviroment.js';
const app = express()

async function main() {
    await connect()
    app.use(cors());
    app.use(express.json());
    app.use(router);

    app.listen(enviroment.port, () => {
        console.log(`${enviroment.app_name} is running !`);
    });
}

main();