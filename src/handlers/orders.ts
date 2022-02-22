import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import { verifyAuthToken } from "../services/auth";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const currentOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrders(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    status: req.body.status,
  };
  try {
    const orders = await store.create(order);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json("Access denied, invalid token");
  }
};
const update = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    status: req.body.status,
  };
  try {
    const orders = await store.update(order, req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json("Access denied, invalid token");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const orders = await store.delete(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json("Access denied, invalid token");
  }
};

const getCompletedOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await store.getCompletedOrders(_req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId.to;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

export const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.get("/users/:id/orders/", verifyAuthToken, currentOrders);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, remove);
  app.post("/orders/:id", verifyAuthToken, addProduct);
  app.get("/users/:id/orders/completed", verifyAuthToken, getCompletedOrders);
};
