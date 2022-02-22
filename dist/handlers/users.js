"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../services/auth");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SERCRET);
        res.json({ username: user.username, token: token });
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const update = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const userr = await store.update(user, req.params.id);
        res.json(userr);
    }
    catch (error) {
        res.status(404);
        res.json("Access denied, invalid token");
    }
};
const remove = async (req, res) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(404);
        res.json(`${error}`);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const userr = await store.authenticate(user.username, user.password);
        const token = jsonwebtoken_1.default.sign({ user: userr }, process.env.TOKEN_SERCRET);
        res.json({ username: userr?.username, token });
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const userRoutes = (app) => {
    app.get("/users", auth_1.verifyAuthToken, index);
    app.get("/users/:id", auth_1.verifyAuthToken, show);
    app.put("/users/:id", auth_1.verifyAuthToken, update);
    app.delete("/users/:id", auth_1.verifyAuthToken, remove);
    app.post("/users", auth_1.verifyAuthToken, create);
    app.post("/users/auth", authenticate);
};
exports.userRoutes = userRoutes;
