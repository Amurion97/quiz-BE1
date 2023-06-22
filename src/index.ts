import * as express from "express"
import * as bodyParser from "body-parser"
import {AppDataSource} from "./data-source"
import router from "./router/router";
import * as cors from 'cors';
import * as http from "http";
import {Server} from "socket.io";
import {socketController} from "./controller/socket/socketController";

const hostname = '127.0.0.1';
const port = 5000;
const FE_SERVER_PORT = 3000;

// create express app
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: `http://${hostname}:${FE_SERVER_PORT}`
    }
});

//app options
app.use(cors({
    // origin: `http://${hostname}:${FE_SERVER_PORT}`,
    // credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);

AppDataSource.initialize().then(async () => {
    //start listening after DB connect success
    server.listen(port);

    io.on('connection', socketController);

    let current = new Date(Date.now())
    console.log(`${current.getHours()}:${current.getMinutes()} Express server has started on port ${port}. 
    Open http://${hostname}:${port}/v1/questions to see results`)

}).catch(error => console.log(error))
