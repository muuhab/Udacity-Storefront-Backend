import supertest from "supertest";
import app from "../../server";
import { Product, ProductStore } from "../../models/product";
import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import db from "../../database";

const request = supertest(app);
const store = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

describe("Test User endpoint responses", () => {
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
    category: "phones",
  } as Product;

  beforeAll(async () => {
    const createdUser = await userStore.create(user);
    order.user_id = createdUser.id as string;
    const createdOrder = await orderStore.create(order);
    order.id = createdOrder.id as string;
    let createdProduct: Product = {};
    let addedProduct;

    for (let index = 0; index < 8; index++) {
      product.price = Math.floor(
        Math.random() * (Math.floor(20000) - Math.ceil(1000)) + 1000
      );
      product.name = `product ${index.toString()}`;
      createdProduct = await store.create(product);
      addedProduct = await orderStore.addProduct(
        Math.floor(
          Math.random() * (Math.floor(100) - Math.ceil(1)) + Math.ceil(1)
        ),
        order.id,
        createdProduct.id as string
      );
    }
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM products;";
    await connection.query(sql);
    connection.release();
  });

  it("check topFiveProducts endpoint", async (done) => {
    const response = await request
      .get("/top/products")
      .set("Content-type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    done();
  });

  it("check getProductsByCategory endpoint", async (done) => {
    const response = await request
      .get(`/products/category/${product.category}`)
      .set("Content-type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body[0].category).toBe(product.category);
    done();
  });
});
