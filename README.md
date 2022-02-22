# Storefront Backend Project

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

## Getting Started

First, install the packages

```bash
npm i
```

Second, create .env file in root directory and add this variables.

```bash
POSTGRES_HOST
POSTGRES_DB
POSTGRES_TEST_DB
POSTGRES_USER
POSTGRES_PASSWORD
ENV=dev
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SERCRET
```

Third, run the development server at http://localhost:3000/

```bash
npm run watch
# or
yarn watch
```
