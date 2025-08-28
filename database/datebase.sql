
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bedts



INSERT INTO users (name, email, password) 
VALUES ('andrea prada', 'andre@hotmail.com', 'andrea123'),
('Jhoana gutierrez', 'jhoana@hotmail.com', 'jhoama123');

SELECT * FROM users;