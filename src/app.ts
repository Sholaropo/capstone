import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

app.use(helmet());
app.use(cors());
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});


app.use(errorHandler);

export default app;