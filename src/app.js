import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import errorHandler from "./middlewares/error.middleware.js";
import router from "./routes/index.routes.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})