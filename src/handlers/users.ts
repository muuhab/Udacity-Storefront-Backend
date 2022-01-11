import express, { Request, Response } from 'express'
import {User,UserStore} from '../models/user'

const store=new UserStore()

const index=async(_req:Request, res:Response)=>{
    const users=await store.index()
    res.json(users)
}

const show = async(req:Request, res:Response)=>{
    const user= await store.show(req.params.id)
    res.json(user)
}

const create = async(req:Request, res:Response)=>{
    const user:User={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
    }
    try {
        const newUser= await store.create(user)
        res.json(newUser)
    } catch (error) {
        res.status(404)
        res.json(error)
    }
}

export const userRoutes=(app:express.Application)=>{
    app.get('/user',index)
    app.get('/user/:id',show)
    app.post('/user',create)
}