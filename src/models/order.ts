import client from '../database'

export type Order={
    id:number,
    product_id:number,
    quantity:number,
    user_id:number,
    status:boolean
}

export class OrderStore{
    async index(id:string):Promise<Order[]>{
        try {
            const sql='SELECT * FROM orders where id=($1)'
            const conn= await client.connect()
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
}