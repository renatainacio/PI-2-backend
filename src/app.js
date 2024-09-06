import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import errorHandler from "./middlewares/error.middleware.js";
import router from "./routes/index.routes.js";
import httpStatus from "http-status";

const app = express();

const port = process.env.PORT || 3000;


dotenv.config();
app
    .use(express.json())
    .use(router)
    .use(errorHandler)
    .get("/health", (req, res) => res.sendStatus(httpStatus.OK))
    .listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    })