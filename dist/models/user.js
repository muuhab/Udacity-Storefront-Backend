"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    async index() {
        try {
            const sql = "SELECT * FROM users";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async create(user) {
        try {
            const sql = "INSERT INTO users(firstName,lastName,username,password) VALUES($1,$2,$3,$4) RETURNING *";
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async update(user, id) {
        try {
            const sql = "UPDATE users SET firstName=($1), lastName=($2), username=($3), password=($4) where id=($5) RETURNING * ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                user.password,
                id,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM users WHERE id=($1) RETURNING * ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async authenticate(username, password) {
        const sql = "SELECT * FROM users WHERE username=($1)";
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [username]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password))
                return user;
        }
        return null;
    }
}
exports.UserStore = UserStore;
