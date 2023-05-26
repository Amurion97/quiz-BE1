import * as express from "express"
import * as bodyParser from "body-parser"
import {AppDataSource} from "./data-source"
import router from "./router/router";
import * as cors from 'cors';

const hostname = '127.0.0.1';
const port = 5000;
const FE_SERVER_PORT = 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors({
        // origin: `http://${hostname}:${FE_SERVER_PORT}`,
        // credentials: true
    }))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('', router);
    app.listen(port);

    let current = new Date(Date.now())
    console.log(`${current.getHours()}:${current.getMinutes()} Express server has started on port ${port}. 
    Open http://${hostname}:${port}/v1/airports to see results`)

}).catch(error => console.log(error))
