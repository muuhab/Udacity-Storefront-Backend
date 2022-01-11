import express, { Request, Response } from 'express'
import {Order,OrderStore} from '../models/order'

const store=new OrderStore()

const index=async(req:Request, res:Response)=>{
    const orders=await store.index(req.params.id)
    res.json(orders)
}

export const orderRoutes=(app:express.Application)=>{
    app.get('/order:id',index)

}