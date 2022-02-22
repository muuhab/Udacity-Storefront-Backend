import { User, UserStore } from "../user";
import { Order, OrderStore } from "../order";
import { Product, ProductStore } from "../product";
import db from "../../database";

const store = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

describe("Product Model", () => {
  const user = {
    firstName: "john",
    lastName: "doe",
    username: "Test",
    password: "test123",
  } as User;

  const order = {
    status: "open",
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
    const createdOrder = await orderStore.create(order);
    order.id = createdOrder.id;
    const createdProduct = await store.create(product);
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

  it("Create method should return a New product", async () => {
    const createdProduct = await store.create({
      name: "iphone",
      price: 213,
      category: "phone",
    } as Product);
    expect(createdProduct.id).toBe(createdProduct.id);
    expect(createdProduct.price).toBe(213);
    expect(createdProduct.category).toBe("phone");
  });

  it("index method should return All available products in DB", async () => {
    const product = await store.index();
    expect(product.length).toBe(2);
  });

  it("show method should return testProduct when called with ID", async () => {
    const returnedProduct = await store.show(product.id as string);
    expect(returnedProduct.price).toBe(product.price);
    expect(returnedProduct.category).toBe(product.category);
  });

  it("Update  method should return a product with edited attributes", async () => {
    const updatedProduct = await store.update(
      { ...product, price: 2 },
      product.id as string
    );
    expect(updatedProduct.price).toBe(2);
  });

  it("Delete method should delete user from DB", async () => {
    const deletedUser = await store.delete(product.id as string);
    expect(deletedUser.id).toBe(product.id);
  });
});
