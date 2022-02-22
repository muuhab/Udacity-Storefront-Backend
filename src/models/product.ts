import client from "../database";

export type Product = {
  id?: string;
  name?: string;
  price?: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING * ";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
  async update(product: Product, id: string): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name=($1), price=($2) ,category=($3) where id=($4) RETURNING * ";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING * ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
}
