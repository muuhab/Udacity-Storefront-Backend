import client from '../database'
import { Product } from '../models/product'

export default class extraQueries {
    async topFiveProducts(): Promise<{name:string, quantity:number}[]> {
        try {
            const sql = 'SELECT name, SUM(quantity) FROM products,order_products WHERE products.id=order_products.product_id GROUP BY name ORDER BY SUM(quantity) DESC LIMIT 5'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    
    async getProductsByCategory(category:string):Promise<Product[]>{
        try {
            const sql = 'SELECT * FROM products where category=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql,[category])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
}