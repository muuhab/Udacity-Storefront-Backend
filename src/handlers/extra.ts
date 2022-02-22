import express, { Request, Response } from "express";
import extraQueries from "../services/extra";

const store = new extraQueries();

const topFiveProducts = async (_req: Request, res: Response) => {
  try {
    const products = await store.topFiveProducts();
    res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const getProductsByCategory = async (_req: Request, res: Response) => {
  try {
    const products = await store.getProductsByCategory(_req.params.category);
    res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

export const extraRoutes = (app: express.Application) => {
  app.get("/top/products", topFiveProducts);
  app.get("/products/category/:category", getProductsByCategory);
};
