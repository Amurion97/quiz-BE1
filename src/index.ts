import * as express from "express"
import * as bodyParser from "body-parser"
import {AppDataSource} from "./data-source"
import router from "./router/router";
import * as cors from 'cors';
import * as http from "http";
import {Server} from "socket.io";
import {socketController} from "./controller/socket/socketController";
import userService from "./service/userService";

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;
const FE_LOCAL_PORT = 3000;
const FE_local = `http://localhost:${FE_LOCAL_PORT}`
const FE_github = 'https://amurion97.github.io';
export const FE_netlify_production = 'https://giangschool-quiz.netlify.app';
const FE_netlify_dev = 'https://dev--giangschool-quiz.netlify.app';
const allowedDomains = [FE_local, FE_github, FE_netlify_dev, FE_netlify_production];


const corsOriginCheckFunction = (origin, callback) => {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
        let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    }
    return callback(null, true);
}

const corsOptions = {
    origin : corsOriginCheckFunction
}
// create express app
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: corsOptions
});

//app options
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);

AppDataSource.initialize().then(async () => {
    //start listening after DB connect success

    await userService.resetAdmin();
    await userService.resetDefaultTeacher();
    // await AppDataSource.getRepository(RoomDetail).update({}, {isOnline: false});


    let current = new Date(Date.now())
    server.listen(Number(port), () => {
        console.log(`${current.getHours()}:${current.getMinutes()} 
        UTC: ${current.toUTCString()} 
        Express server has started on port ${port}. 
        Open http://${hostname}:${port}/v1/questions to see results`)
    });

    io.on('connection', socketController);

}).catch(error => console.log(error))
