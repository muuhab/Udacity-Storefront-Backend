import client from '../database'

export type Product={
    name: string,
    price: number
}

export class ProductStore{
    async index():Promise<Product[]>{
        try {
            const sql='SELECT * FROM products'
            const conn= await client.connect()
            const result= await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }

    async show(id:string):Promise<Product[]>{
        try {
            const sql='SELECT * FROM products WHERE id=($1)'
            const conn= await client.connect()
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    async create(product:Product):Promise<Product>{
        try {
            const sql='INSERT INTO products (name,price) VALUES($1,$2) RETURNING '
            const conn= await client.connect()
            const result= await conn.query(sql,[product.name,product.price])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
}