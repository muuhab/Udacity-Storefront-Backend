import supertest from "supertest";
import app from "../../server";
import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import db from "../../database";

const request = supertest(app);
const store = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

const token = process.env.TOKEN_TEST;

describe("Test Products endpoint responses", () => {
  const user = {
    firstName: "muhab",
    lastName: "sherif",
    username: "mou",
    password: "123123",
  } as User;

  const order = {
    status: "open",
  } as Order;

  const product = {
    name: "iphone",
    price: 200,
    category: "phones",
  } as Product;

  beforeAll(async () => {
    const createdUser = await userStore.create(user);
    order.user_id = createdUser.id as string;
    const createdOrder = await orderStore.create(order);
    order.id = createdOrder.id;
    const createdProduct = await store.create(product);
    product.id = createdProduct.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users;";
    const sql2 = "DELETE FROM orders;";
    const sql3 = "DELETE FROM products;";
    await connection.query(sql);
    await connection.query(sql2);
    await connection.query(sql3);
    connection.release();
  });

  it("check index endpoint", async (done) => {
    const response = await request
      .get("/products")
      .set("Content-type", "application/json");
    expect(response.status).toBe(200);
    done();
  });

  it("check show endpoint", async (done) => {
    const response = await request
      .get(`/products/${product.id}`)
      .set("Content-type", "application/json");
    expect(response.status).toBe(200);
    done();
  });

  it("check create endpoint", async (done) => {
    const response = await request
      .post(`/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "samsung",
        price: 12312,
        category: "phones",
      } as Product);
    expect(response.status).toBe(200);
    done();
  });

  it("check update endpoint", async (done) => {
    const response = await request
      .put(`/products/${product.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...product,
        price: 22,
      } as Product);
    expect(response.status).toBe(200);
    done();
  });

  it("check delete endpoint", async (done) => {
    const response = await request
      .delete(`/products/${product.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });
});
