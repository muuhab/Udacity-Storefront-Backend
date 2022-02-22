"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_1 = require("../models/product");
const auth_1 = require("../services/auth");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(404);
        res.json(`${error}`);
    }
};
const update = async (req, res) => {
    const product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    };
    try {
        const products = await store.update(product, req.params.id);
        res.json(products);
    }
    catch (error) {
        res.status(404);
        res.json(`${error}`);
    }
};
const remove = async (req, res) => {
    try {
        const product = await store.delete(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(404);
        res.json(`${error}`);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.put('/products/:id', auth_1.verifyAuthToken, update);
    app.delete('/products/:id', auth_1.verifyAuthToken, remove);
    app.post('/products', auth_1.verifyAuthToken, create);
};
exports.productRoutes = productRoutes;
