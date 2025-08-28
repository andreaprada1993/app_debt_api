import { pool } from '../db.js';


export const getUsers = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
}


export const getUser = async (req, res) => {

    if (rows.legth === 0) {
        return res.status(404).json({ message: "user not found" });
    }
    res.json(rows);
}

export const  createUser = async (req, res) => {

    try {
         const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
        [data.name, data.email,  data.password]
    );
    return res.json(rows[0]);
        
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
    const {  rowsCount } = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *", 
        [id]
    );
    if (rowsCount === 0) {
        return res.status(404).json({ message: "user not found" });
    }

    return res.sendStatus(204);
}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [data.name, data.email, data.password, id])

    return res.json(rows[0]);
}