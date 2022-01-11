import express, { Request, Response } from 'express'
import {Product,ProductStore} from '../models/product'

const store=new ProductStore()

const index=async(_req:Request, res:Response)=>{
    const products=await store.index()
    res.json(products)
}

const show = async(req:Request, res:Response)=>{
    const product= await store.show(req.params.id)
    res.json(product)
}

const create = async(req:Request, res:Response)=>{
    const product:Product={
        name:req.params.name,
        price: parseInt(req.params.price)
    }
    try {
        const newProduct= await store.create(product)
        res.json(newProduct)
    } catch (error) {
        res.status(404)
        res.json(error)
    }
}

export const productRoutes=(app:express.Application)=>{
    app.get('/product',index)
    app.get('/product/:id',show)
    app.post('/product',create)
}