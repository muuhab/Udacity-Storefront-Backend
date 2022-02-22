"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const auth_1 = require("../services/auth");
const store = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const orders = await store.show(req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const currentOrders = async (req, res) => {
    try {
        const orders = await store.currentOrders(req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const orders = await store.create(order);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json("Access denied, invalid token");
    }
};
const update = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const orders = await store.update(order, req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json("Access denied, invalid token");
    }
};
const remove = async (req, res) => {
    try {
        const orders = await store.delete(req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json("Access denied, invalid token");
    }
};
const getCompletedOrders = async (_req, res) => {
    try {
        const orders = await store.getCompletedOrders(_req.params.id);
        res.json(orders);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId.to;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const orderRoutes = (app) => {
    app.get("/orders", auth_1.verifyAuthToken, index);
    app.get("/orders/:id", auth_1.verifyAuthToken, show);
    app.get("/users/:id/orders/", auth_1.verifyAuthToken, currentOrders);
    app.post("/orders", auth_1.verifyAuthToken, create);
    app.put("/orders/:id", auth_1.verifyAuthToken, update);
    app.delete("/orders/:id", auth_1.verifyAuthToken, remove);
    app.post("/orders/:id", auth_1.verifyAuthToken, addProduct);
    app.get("/users/:id/orders/completed", auth_1.verifyAuthToken, getCompletedOrders);
};
exports.orderRoutes = orderRoutes;
