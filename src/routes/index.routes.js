import { Router } from "express";
import clientsRouter from "./clients.routes.js";

const router = Router();

router.use(clientsRouter);

export default router;