CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quatity integer,
    user_id bigint REFERENCES users(id),
    status BOOLEAN
);