<h1 align="center">
  <br>
  <img src="https://github.com/argadeva/djago-backend-restfulapi/raw/master/demo/logo.png" width="200">
  <br>
  D'Jago Backend RestFulAPI
  <br>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v12.14.1-success">
  <img src="https://img.shields.io/badge/Express.js-v.4.17.1-informational">
</p>

## Table of Contents

- [Introduction](#introduction)
- [How To Install](#how-to-install)
- [API Versioning](#api-versioning)
- [List of Endpoints](#list-of-endpoints)
- [Related Project](#related-project)

## Introduction

D'Jago Backend RestFulAPI is a Point of Sale systems with restful api. The main features are:

- Login and Register with JWT.

- User, Categories and Products database.

- Stock management ( Stock In & Out )

- CURD User, Products, Categories and Stock.

- Add/Reduce Products Order

- File Image Upload on product.

- Search product by name.

- Sort product by name, category, date updated.

- Products page pagination

- Allowed CORS

- Reporting on income today, yearly, and orders weekly.

D'Jago Backend RestFulAPI is written in Node Js with Express framework, it uses MySQL as data storage back-end and has a simple but intuitive user interface.

## How To Install

1. Clone this repository
   ```
   $ git clone https://github.com/argadeva/djago-backend-restfulapi.git
   ```
2. Create a database and import file [database.sql](https://github.com/argadeva/djago-backend-restfulapi/raw/master/demo/database.sql) to database.

3. Install all depedencies on the package.json
   ```
   $ cd djago-backend-restfulapi
   $ npm install
   ```

   ```
4. Create `.env` file with environment variable in line with following:
   ```
   SERVER_PORT = 1000
   DB_HOST = "localhost"
   DB_USER = "your-user"
   DB_PASS = "your-password"
   DB_NAME = "your-database"
   PRIVATE_KEY = "your-private-key"
   URL = "http://localhost:1000/"
   ```
5. Run
   ```
   $ npm start
   ```

## API Versioning

The first part of the URI path specifies the API version you wish to access in the format `v{version_number}`.

For example, version 1 of the API (most current) is accessible via:

```
https://localhost:1000/api/v1/
```

## List of Endpoints

**USERS**

- **[GET]** /api/v1/users

      	Get all users

- **[GET]** /api/v1/users/:id

      	Get user detail

- **[PATCH]** /api/v1/users/:id

      	Update user data

  **Sample Data**

  ```
  name: your-name
  email: your-email
  password: your-password
  ```

- **[DELETE]** /v1/users/:id

      	Delete user

- **[POST]** /api/v1/users

      	Insert new user

  **Sample Data**

  ```
  name: your-name
  email: your-email
  password: your-password
  ```

- **[POST]** /api/v1/users/login {email, password}

      	Login user

  **Sample Data**

  ```
  email: your-email
  password: your-password
  ```

- **[POST]** /api/v1/users/logout

      	Logout user

**CATEGORIES**

- **[GET]** /api/v1/categories

      	Get all categories

- **[GET]** /api/v1/categories/:id

      	Get categories detail

- **[PATCH]** /api/v1/categories/:id

      	Update categories data

  **Sample Data**

  ```
  name: your-name-categories
  ```

- **[DELETE]** /v1/categories/:id

      	Delete categories

- **[POST]** /api/v1/categories

      	Insert categories

  **Sample Data**

  ```
  name: your-name-categories
  ```

**PRODUCTS**

- **[GET]** /api/v1/products

      	Get all products

- **[GET]** /api/v1/products/:id

      	Get products detail

- **[PATCH]** /api/v1/products/:id

      	Update products data

  **Sample Data**

  ```
  name: product-name
  description: product-description
  image: product-image-url
  price: product-price
  category_id: product-category_id
  ```

- **[DELETE]** /v1/products/:id

      	Delete products

- **[POST]** /api/v1/products

      	Insert products

  **Sample Data**

  ```
  name: product-name
  description: product-description
  image: product-image-url
  price: product-price
  category_id: product-category_id
  ```

- **[GET]** /api/v1/products/search/:name

      	Search products by name

- **[GET]** /api/v1/products/sort/:sort

      	Sort products by name, category, last_update

- **[GET]** /api/v1/products/page/:page

      	Get products list with pagination

**STOCKS**

- **[GET]** /api/v1/stocks

      	Get all stocks

- **[PATCH]** /api/v1/stocks/:id

      	Update stocks data

  **Sample Data**

  ```
  product_id: product-id
  type: ENUM("IN/OUT")
  qty: Integer Number
  description: your-description
  ```

- **[DELETE]** /v1/stocks/:id

      	Delete stocks

- **[POST]** /api/v1/stocks

      	Insert stocks

  **Sample Data**

  ```
  product_id: product-id
  type: ENUM("IN/OUT")
  qty: Integer Number
  description: your-description
  ```

**CHECKOUT**

- **[GET]** /api/v1/checkout

      	Get all checkout

- **[GET]** /api/v1/checkout/cart

      	Get checkout from user login

- **[POST]** /api/v1/checkout

      	Insert checkout

  **Sample Data**

  ```
  order_number: your-order-number
  ```

- **[POST]** /api/v1/checkout/cart

      	Insert product to checkout cart

  **Sample Data**

  ```
  order_id: order-id
  product_id: product-id
  qty: order-product-qty
  ```

**HISTORY**

- **[GET]** /api/v1/history

      	Get reporting on income today, yearly, and orders weekly

## Related Project

- [`D'Jago Frontend React Redux (Front-end Web App)`](https://github.com/argadeva/djago-frontend-react-redux)
- [`D'Jago React Native (Mobile App)`](https://github.com/argadeva/djago-react-native)
