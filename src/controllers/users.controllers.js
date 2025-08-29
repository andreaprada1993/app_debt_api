import { pool } from '../db.js';
import bcrypt from 'bcrypt';



export const getUsers = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
}


export const getUser = async (req, res) => {

 const { id } = req.params;
    const { rows } = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [id]
    );
    if (rows.length === 0) {
        return res.status(404).json({ message: "user not found" });
    }
    res.json(rows[0]);
}


export const  createUser = async (req, res) => {

    try {
         const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const { rows } = await pool.query(
        
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
        
            [name, email,  hashedPassword]
    );

   res.status(201).json(rows[0]);
        
    } catch (error) {
        console.log(error);

        if (error?.code === '23505') {
            return res.status(409).json({ message: "the user already exists" });
        }
        
        return res.status(500).json({
            message: "Something goes wrong"
        })
        
    }
    
}

export const deteleUser = async (req, res) => { 
    const { id } = req.params;
    const {  rowCount } = await pool.query(
        "DELETE FROM users WHERE id = $1 ", 
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "user not found" });
    }

    return res.sendStatus(204).json({message: "user deleted successfully"});
}


export const updateUser = async (req, res) => {

 try {
     
    const { id } = req.params;
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
    
        `UPDATE users SET name = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
    
        [name, email, hashedPassword, id]
    );

    res.json(rows[0]);

 } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    
 }
}