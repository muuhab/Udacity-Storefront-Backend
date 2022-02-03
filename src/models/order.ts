import client from '../database'

export type Order = {
    user_id: number,
    status: string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    async create(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders(user_id,status) VALUES($1,$2) RETURNING * '
            const conn = await client.connect()
            const result = await conn.query(sql, [order.user_id, order.status])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }

    async update(order:Order,id:string):Promise<Order>{
        try {
            const sql='UPDATE orders SET(user_id,status) VALUES($1,$2) where id=($3) RETURNING * '
            const conn= await client.connect()
            const result= await conn.query(sql,[order.user_id,order.status,id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    async delete(id:string):Promise<Order>{
        try {
            const sql='DELETE FROM orders WHERE id=($1) RETURNING * '
            const conn= await client.connect()
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }

    async getCompletedOrders(id:string):Promise<Order[]>{
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='closed'"
            const conn = await client.connect()
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "open") {
                throw new Error(`Could not add product to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()

        } catch (err) {
            throw new Error(`${err}`)
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [quantity, orderId, productId])
            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}