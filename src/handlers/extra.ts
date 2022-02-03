import express, { Request, Response } from 'express'
import extraQueries from '../services/extra'

const store= new extraQueries()

const topFiveProducts=async(_req: Request, res: Response)=>{
    const products = await store.topFiveProducts()
    res.json(products)
}

const getProductsByCategory=async(_req: Request, res: Response)=>{
    const products = await store.getProductsByCategory(_req.params.category)
    res.json(products)
}

export const extraRoutes=(app: express.Application)=>{
    app.get('/top/products',topFiveProducts)
    app.get('/products/category/:category',getProductsByCategory)
}
