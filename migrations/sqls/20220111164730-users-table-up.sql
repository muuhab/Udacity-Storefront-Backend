CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL,
    password VARCHAR NOT NULL
 );