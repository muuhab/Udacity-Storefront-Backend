import client from '../database'

export type User={
    firstName:string,
    lastName:string,
    password:string
}

export class UserStore{
    async index():Promise<User[]>{
        try {
            const sql='SELECT * FROM users'
            const conn= await client.connect()
            const result= await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }

    async show(id:string):Promise<User[]>{
        try {
            const sql='SELECT * FROM users WHERE id=($1)'
            const conn= await client.connect()
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
    async create(user:User):Promise<User>{
        try {
            const sql='INSERT INTO users (firstName,lastName,password) VALUES($1,$2,$3) RETURNING '
            const conn= await client.connect()
            const result= await conn.query(sql,[user.firstName,user.lastName,user.password])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Something Wrong ${error}`)
        }
    }
}