DROP DATABASE IF EXISTS secretary_app;
CREATE DATABASE IF NOT EXISTS secretary_app;
USE secretary_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL
);

-- Insert default admin user 'tj' with a placeholder password hash.
-- IMPORTANT: Replace 'YOUR_HASHED_PASSWORD_FOR_FOOBAR' with the actual hashed password for 'foobar'.
-- You can obtain this by registering 'tj' with 'foobar' as password through the application
-- and then retrieving the hash from the database, or by using a known hashing utility.
INSERT INTO users (name, hash, is_admin) VALUES ('tj', '$2b$10$Mj47ItTysVw4.6DDPgNf6ugmxCB1.rdpSDvFjQVuKPjqiz/Gz0NTe', TRUE);
