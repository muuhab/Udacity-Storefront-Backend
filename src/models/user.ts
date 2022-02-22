import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users(firstName,lastName,username,password) VALUES($1,$2,$3,$4) RETURNING *";
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }

  async update(user: User, id: string): Promise<User> {
    try {
      const sql =
        "UPDATE users SET firstName=($1), lastName=($2), username=($3), password=($4) where id=($5) RETURNING * ";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.password,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING * ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something Wrong ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE username=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [username]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password))
        return user;
    }
    return null;
  }
}
