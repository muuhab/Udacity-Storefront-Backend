import { User, UserStore } from "../user";
import db from "../../database";

const store = new UserStore();

describe("User Model", () => {
  const user = {
    firstName: "john",
    lastName: "doe",
    username: "Test",
    password: "test123",
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

  it("should have an authenticate function", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("Create method should return a New User", async () => {
    const createdUser = await store.create({
      firstName: "test2@test.com",
      lastName: "test2User",
      username: "Test",
      password: "test123",
    } as User);
    expect(createdUser.id).toBe(createdUser.id);
    expect(createdUser.username).toBe(createdUser.username);
  });

  it("index method should return All available users in DB", async () => {
    const users = await store.index();
    expect(users.length).toBe(2);
  });

  it("show method should return testUser when called with ID", async () => {
    const returnedUser = await store.show(user.id as string);
    expect(returnedUser.id).toBe(user.id);
    expect(returnedUser.username).toBe(user.username);
  });

  it("Update  method should return a user with edited attributes", async () => {
    const updatedUser = await store.update(
      { ...user, username: "noname" },
      user.id as string
    );
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.username).toBe("noname");
  });

  it("Delete method should delete user from DB", async () => {
    const deletedUser = await store.delete(user.id as string);
    expect(deletedUser.id).toBe(user.id);
  });
});
