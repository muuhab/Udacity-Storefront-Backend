import express, { Request, Response, NextFunction } from "express";
import { Product, ProductStore } from "../models/product";
import { verifyAuthToken } from "../services/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(404);
    res.json(`${error}`);
  }
};
const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
  };
  try {
    const products = await store.update(product, req.params.id);
    res.json(products);
  } catch (error) {
    res.status(404);
    res.json(`${error}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const product = await store.delete(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404);
    res.json(`${error}`);
  }
};

export const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/:id", verifyAuthToken, remove);
  app.post("/products", verifyAuthToken, create);
};
