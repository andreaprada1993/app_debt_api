
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE debts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(19, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_amount CHECK (amount >= 0),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION prevent_completed_debt_modification()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'completed' THEN
        RAISE EXCEPTION 'Cannot modify or delete a completed debt';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Elimina el trigger si ya existe
DROP TRIGGER IF EXISTS check_completed_debt ON debts;

-- Crea el trigger en la tabla debts
CREATE TRIGGER check_completed_debt
BEFORE UPDATE OR DELETE ON debts
FOR EACH ROW
EXECUTE FUNCTION prevent_completed_debt_modification();


INSERT INTO users (name, email, password) 
VALUES ('andrea prada', 'andre@hotmail.com', 'andrea123'),
('Jhoana gutierrez', 'jhoana@hotmail.com', 'jhoama123');


INSERT INTO debts (user_id, description, amount, status)
VALUES 
(2, 'Compra de insumos', 150.75, 'pending'),
(18, 'Pago de servicios', 200.00, 'completed'),
(19, 'Venta de productos', 300.50, 'pending'),
(18, 'Compra de software', 500.00, 'pending');


SELECT * FROM users;
SELECT * FROM debts;