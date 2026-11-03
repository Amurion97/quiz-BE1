import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import router from "./router/router";
import { mountSwagger } from "./swagger";
import { allowedDomains } from "./config";

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
    origin: corsOriginCheckFunction
}

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mountSwagger(app);
app.use('', router);

export default app;
