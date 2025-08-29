import { Router } from "express";
import { updateDebt, 
    deleteDebt, 
    createDebt, 
    getDebts, 
    getDebt,
 } from "../controllers/debts.controllers.js";


const router = Router();

router.get("/debts", getDebts );

router.get("/debts/users/:users_id",getDebt);

router.post("/debts", createDebt );

router.delete("/debts/:id", deleteDebt);

router.put("/debts/:id", updateDebt );


export default router;