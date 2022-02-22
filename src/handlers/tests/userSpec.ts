import supertest from "supertest";
import app from "../../server";
import { User, UserStore } from "../../models/user";
import db from "../../database";

const request = supertest(app);
const store = new UserStore();

const token = process.env.TOKEN_TEST;

describe("Test User endpoint responses", () => {
  const user = {
    firstName: "muhab",
    lastName: "sherif",
    username: "mou",
    password: "123123",
  } as User;

  beforeAll(async () => {
    const createdUser = await store.create(user);
    user.id = createdUser.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users;";
    await connection.query(sql);
    connection.release();
  });

  it("check index endpoint", async (done) => {
    const response = await request
      .get("/users")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check show endpoint", async (done) => {
    const response = await request
      .get(`/users/${user.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check create endpoint", async (done) => {
    const response = await request
      .post(`/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "muhab2",
        lastName: "sherif2",
        username: "mou2",
        password: "test",
      } as User);
    expect(response.status).toBe(200);
    done();
  });

  it("check update endpoint", async (done) => {
    const response = await request
      .put(`/users/${user.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...user,
        username: "muhabSHerif",
      } as User);
    expect(response.status).toBe(200);
    done();
  });

  it("check delete endpoint", async (done) => {
    const response = await request
      .delete(`/users/${user.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("check auth endpoint", async (done) => {
    const response = await request
      .post(`/users/auth`)
      .set("Content-type", "application/json")
      .send({ username: "mou", password: "123123" });
    expect(response.status).toBe(200);
    done();
  });
});
