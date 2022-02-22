"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const sql = "SELECT * FROM products";
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
            const sql = "SELECT * FROM products WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async create(product) {
        try {
            const sql = "INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING * ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
    async update(product, id) {
        try {
            const sql = "UPDATE products SET name=($1), price=($2) ,category=($3) where id=($4) RETURNING * ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
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
            const sql = "DELETE FROM products WHERE id=($1) RETURNING * ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Something Wrong ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
