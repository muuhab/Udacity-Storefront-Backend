import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "../services/auth";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SERCRET as string
    );
    res.json({ username: user.username, token: token });
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const userr = await store.update(user, req.params.id);
    res.json(userr);
  } catch (error) {
    res.status(404);
    res.json("Access denied, invalid token");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const user = await store.delete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404);
    res.json(`${error}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const userr = await store.authenticate(user.username, user.password);
    const token = jwt.sign(
      { user: userr },
      process.env.TOKEN_SERCRET as string
    );
    res.json({ username: userr?.username, token });
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

export const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.put("/users/:id", verifyAuthToken, update);
  app.delete("/users/:id", verifyAuthToken, remove);
  app.post("/users", verifyAuthToken, create);
  app.post("/users/auth", authenticate);
};
