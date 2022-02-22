import { User, UserStore } from "../user";
import { Order, OrderStore } from "../order";
import { Product, ProductStore } from "../product";
import db from "../../database";

const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe("Order Model", () => {
  const user = {
    firstName: "john",
    lastName: "doe",
    username: "Test",
    password: "test123",
  } as User;

  const order = {
    status: "open",
  } as Order;

  const closedOrder = {
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
    order.user_id = user.id as string;
    closedOrder.user_id = user.id as string;
    const createdOrder = await store.create(order);
    const createdOrder2 = await store.create(closedOrder);
    order.id = createdOrder.id;
    closedOrder.id = createdOrder2.id;
    const createdProduct = await productStore.create(product);
    product.id = createdProduct.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders;";
    const sql2 = "DELETE FROM users;";
    const sql3 = "DELETE FROM products;";
    await connection.query(sql);
    await connection.query(sql2);
    await connection.query(sql3);
    connection.release();
  });

  it("should have an index function", () => {
    expect(store.index).toBeDefined();
  });

  it("should have an create function", () => {
    expect(store.create).toBeDefined();
  });

  it("should have an update function", () => {
    expect(store.update).toBeDefined();
  });

  it("should have an update function", () => {
    expect(store.update).toBeDefined();
  });

  it("Create method should return a New order", async () => {
    const createdOrder = await store.create({
      user_id: user.id,
      status: "open",
    } as Order);
    expect(createdOrder.id).toBe(createdOrder.id);
    expect(createdOrder.status).toBe(createdOrder.status);
  });

  it("index method should return All available orders in DB", async () => {
    const order = await store.index();
    expect(order.length).toBe(3);
  });

  it("show method should return testOrder when called with ID", async () => {
    const returnedOrder = await store.show(order.id as string);
    expect(returnedOrder.id).toBe(order.id);
    expect(returnedOrder.status).toBe(order.status);
  });

  it("Update  method should return a order with edited attributes", async () => {
    const updatedOrder = await store.update(
      { ...order, status: "closed" },
      order.id as string
    );
    expect(updatedOrder.id).toBe(order.id);
    expect(updatedOrder.status).toBe("closed");
  });

  it("Delete method should delete user from DB", async () => {
    const deletedUser = await store.delete(order.id as string);
    expect(deletedUser.id).toBe(order.id);
  });

  it("Current Orders method should return orders for specific user", async () => {
    const currentOrders = await store.currentOrders(user.id as string);
    expect(currentOrders[0].user_id).toBe(order.user_id.toString());
  });

  it("Get Completed Orders method  return completed orders for specific user", async () => {
    const currentOrders = await store.getCompletedOrders(user.id as string);
    expect(currentOrders[0].user_id).toBe(order.user_id.toString());
  });

});
