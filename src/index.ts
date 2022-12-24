import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { db } from "./helpers/connection";
import todoRouter from "./services/ToDo/router";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(function (req: Request, res: Response, next: Function) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({ limit: "50mb" }));
app.use("/", todoRouter);

app.listen(process.env.PORT, () => {
    db.connect((err: any) => {
        if (err) {
        } else {
            console.info(`Database is Connected!`);
        }
    });
    console.log(`Running On : ${process.env.PORT}`);
});
