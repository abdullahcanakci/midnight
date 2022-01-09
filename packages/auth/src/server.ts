import * as bodyParser from "body-parser";
import * as express from "express";
import routes from "./routes";

const server = express();

server.use(bodyParser.json());
server.use(routes);

export default server;
