import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routers/users.routes.js";
import debtRoutes from "./routers/debts.routes.js";
import morgan from "morgan";

const app = express();


app.use(morgan('dev'))
app.use(express.json());
app.use(userRoutes);
app.use(debtRoutes);


app.listen(PORT);
console.log("Server on port", PORT);