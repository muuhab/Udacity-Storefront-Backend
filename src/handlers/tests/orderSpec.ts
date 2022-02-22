import supertest from "supertest";
import app from "../../server";
import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import db from "../../database";

const request = supertest(app);
const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.YXhIqeGNYYnHCpEex74ZA_TsRkhLrGMYGHxS9glzDAM";

describe("Test Orders endpoint responses", () => {
  const user = {
    firstName: "muhab",
    lastName: "sherif",
    username: "mou",
    password: "123123",
  } as User;

  const order = {
    status: "open",
  } as Order;

  const completedOrder = {
    status: "closed",
  } as Order;

  const product = {
    name: "iphone",
    price: 120,
    category: "phone",
  } as Product;

  beforeAll(async () => {
    const createdUser = await userStore.create(user);
    user.id = createdUser.id;
    order.user_id = createdUser.id as string;
    completedOrder.user_id = createdUser.id as string;
    const createdOrder = await store.create(order);
    const createdcompletedOrder = await store.create(completedOrder);
    order.id = createdOrder.id;
    completedOrder.id = createdcompletedOrder.id;
    const createdProduct = await productStore.create(product);
    product.id = createdProduct.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users;";
    const sql2 = "DELETE FROM orders;";
    await connection.query(sql);
    await connection.query(sql2);
    connection.release();
  });

  it("check index endpoint", async (done) => {
    const response = await request
      .get("/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check show endpoint", async (done) => {
    const response = await request
      .get(`/orders/${order.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check currentOrders endpoint", async (done) => {
    const response = await request
      .get(`/users/${user.id}/orders/`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check create endpoint", async (done) => {
    const response = await request
      .post(`/orders`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: user.id,
        status: "closed",
      } as Order);
    expect(response.status).toBe(200);
    done();
  });

  it("check addProduct to order endpoint", async (done) => {
    const response = await request
      .post(`/orders/${order.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 4, productId: product.id });
    expect(response.status).toBe(200);
    done();
  });

  it("check update endpoint", async (done) => {
    const response = await request
      .put(`/orders/${order.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...order,
        status: "closed",
      } as Order);
    expect(response.status).toBe(200);
    done();
  });

  it("check delete endpoint", async (done) => {
    const response = await request
      .delete(`/orders/${order.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check getCompletedOrders endpoint", async (done) => {
    const response = await request
      .get(`/users/${user.id}/orders/completed`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.length).toBeGreaterThan(0);
    done();
  });
});
