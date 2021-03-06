# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- Update [token required]: '/products/:id'' [PUT]
- Delete [token required]: '/products/:id'' [DELETE]
- [OPTIONAL] Top 5 most popular products '/top/products' [GET]
- [OPTIONAL] Products by category (args: product category) '/products/category/:category' [GET]

#### Users

- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create N[token required]: "/users" [POST]
- Delete [token required]: "/users/:id" [DELETE]
- Update [token required]: "/users/:id" [PUT]
- Authenticate "/users/auth" [POST]

#### Orders

- Index [token required]: '/orders' [GET]
- Show [token required]: "/orders/:id" [GET]
- Create N[token required]: "/orders" [POST]
- Create N[token required] in order_products: "/orders/:id" [POST]
- Delete [token required]: "/orders/:id" [DELETE]
- Update [token required]: "/orders/:id" [PUT]
- Current Order by user (args: user id)[token required]: '/users/:id/orders/completed' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: /users/:id/orders/ [Get]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

- Table products: (id:number, name:string, price:number, category:string)

#### User

- id
- firstName
- lastName
- password

- Table users: (id:number, firstName:string, lastName:string, username:string, password:string)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

- Table orders: (id:number, user_id:number[foreign key to users table], status:boolean)

#### Order_Products

- id
- quantity
- order_id
- product_id

- Table order_products(id:number, product_id:number[foreign key to products table], order_id:number[foreign key to orders table]quantity:number,)
