
import { pool } from "../db.js";



export const getDebts = async (req, res) => {
   
    try {
   
        const { rows } = await pool.query("SELECT * FROM debts");
    
        res.json(rows);
   
    } catch (error) {
   
        console.error(error);
   
        res.status(500).json({ error: "Internal server error" });
   
    }

}


export const getDebt = async (req, res) => {
   
    try {
   
        const { users_id } = req.params;
   
        const { rows } = await pool.query(
   
            "SELECT * FROM debts WHERE id = $1",
   
            [users_id]
        );

        if (rows.length === 0)
   
            return res.status(404).json({ error: "Debt not found" });

        res.json(rows);

    } catch (error) {

        console.error(error);
   
        res.status(500).json({ error: "Internal server error" });

    }

}


export const createDebt = async (req, res) => {

    try {

        const { user_id, description, amount, status } = req.body;
   
        const { rows } = await pool.query(
   
            "INSERT INTO debts (user_id, description, amount, status) values ($1, $2, $3, $4) RETURNING * ",
   
            [user_id, description, amount, status]
        );

    
        res.status(201).json(rows[0]);
   
    } catch (error) {

        console.log(error);
    
        res.status(500).json({ error: "Internal server error" });

    }

}


export const deleteDebt = async (req, res) => {
    
    try {
    
        const { id } = req.params;
    
        const { rowCount } = await pool.query("DELETE FROM debts WHERE id = $1",
    
            [id]
    
        );

        if (rowCount === 0) return res.status(404).json({ message: "Debt not found" });
    
        res.status(200).json({ message: "Debt successfully deleted" });

    } catch (error) {
    
        console.error(error);
    
        if (error.code === "23503") {
    
            return res.status(409).json({ message: error.message });
    
        }
    
        res.status(500).json({ message: "Internal server error" });
    }
}



export const updateDebt = async (req, res) => {
    
    try {
    
        const { id } = req.params;
    
        const { user_id, description, amount, status } = req.body;

        const { rows } = await pool.query(
        
            "SELECT * FROM debts WHERE id = $1",
        
            [id]
        
        );


        if (rows.length === 0) {
    
            return res.status(404).json({ message: "Debt not found" });
    
        }


        const debt = rows[0];



        if (debt.status === 'completed') {

            return res.status(409).json({ message: "Cannot modify a completed debt" });
        }

        const { rows: updatedRows } = await pool.query(
        
            `UPDATE debts  SET user_id = $1, description = $2, amount = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 
        
            RETURNING *`,
        
            [user_id, description, amount, status, id]
        
        );

        res.json(updatedRows[0]);

    } catch (error) {

        console.error(error);
        
        res.status(500).json({ message: "Internal server error" });
    
    }

}