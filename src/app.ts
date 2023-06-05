import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import customerRouter from "./routers/customerRouter";

const app = express();

morgan.token("body", function getId (req: Request) {
	return JSON.stringify(req.body);
});

morgan.token("datetime", function getDate () {
	return new Date().toLocaleString();
});

app.use(morgan("dev", {
	skip: function (req, res) { return res.statusCode < 400; }
}));

app.use(morgan(":datetime :remote-addr :method :url :status :res[content-length] - :response-time ms :body", {
	stream: fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
}));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/customers/", customerRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.send("Hi people!");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send(error.message);
});



export default app;