# Storefront Backend Project

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Features

- Crud API for User
- Crud API for Product
- Crud API for Orders
- Get top 5 products
- Get products by category
- Get current user's orders
- Get completed orders

## Technologies

- NodeJs
- Express
- typescript
- JWT
- Supertest
- Jasmine
- Bcrypt

## Installation Instructions

Install the packages

```bash
npm i
```

## Set up Database

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER my_store_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE my_store;`
  - `CREATE DATABASE my_store_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c my_store`
    - `GRANT ALL PRIVILEGES ON DATABASE my_store TO my_store_user;`
  - Grant for test database
    - `\c my_store_test`
    - `GRANT ALL PRIVILEGES ON DATABASE my_store_test TO my_store_user;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`db-migrate up`

!['migrate database'](./demo/migrations.png)

## Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=my_store
POSTGRES_TEST_DB=my_store_test
POSTGRES_USER=postgres
POSTGRES_PORT=5432
POSTGRES_PASSWORD=my_password
ENV=dev
BCRYPT_PASSWORD=my-name-is-muhab
SALT_ROUNDS=10
TOKEN_SERCRET=valar morghulis
TOKEN_TEST= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.YXhIqeGNYYnHCpEex74ZA_TsRkhLrGMYGHxS9glzDAM

```

## Start App

`yarn watch` or `npm run watch`
!['start server'](./demo/watch.png)

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Testing

Run test with

`yarn test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.

!['test 1'](./demo/test1.png)
!['test 2'](./demo/test2.png)
!['test 3'](./demo/test3.png)

## Important Notes

### Environment Variables

Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. The names of the variables that need to be set above. I also provided the values that were used in development and testing.
