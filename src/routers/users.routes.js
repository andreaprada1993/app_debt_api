import { Router } from "express";
import { 
    deteleUser, 
    createUser, 
    getUser, 
    getUsers, 
    updateUser 
} from "../controllers/users.controllers.js";



const router = Router();

router.get('/users', getUsers );

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deteleUser );

router.put('/users/:id', updateUser);

export default router;