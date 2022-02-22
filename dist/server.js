"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = require("./handlers/products");
const users_1 = require("./handlers/users");
const orders_1 = require("./handlers/orders");
const extra_1 = require("./handlers/extra");
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, orders_1.orderRoutes)(app);
(0, products_1.productRoutes)(app);
(0, users_1.userRoutes)(app);
(0, extra_1.extraRoutes)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
