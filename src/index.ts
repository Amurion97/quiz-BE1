import app from "./app";

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

let current = new Date(Date.now())
app.listen(Number(port), () => {
    console.log(`${current.getHours()}:${current.getMinutes()} 
        UTC: ${current.toUTCString()} 
        Express server has started on port ${port}. 
        Open http://${hostname}:${port}/v1/questions to see results`)
});
