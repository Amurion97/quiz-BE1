import app from "./app";
import { AppDataSource } from "./data-source";
import userService from "./service/userService";

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

AppDataSource.initialize().then(async () => {
    await userService.resetAdmin();
    await userService.resetDefaultTeacher();

    let current = new Date(Date.now())
    app.listen(Number(port), () => {
        console.log(`${current.getHours()}:${current.getMinutes()} 
        UTC: ${current.toUTCString()} 
        Express server has started on port ${port}. 
        Open http://${hostname}:${port}/v1/questions to see results`)
    });
}).catch(error => console.log(error));
