# 🛒 E-Commerce Backend API

A RESTful API for an E-Commerce system built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

The API provides complete management for categories, products, shopping carts, and orders, including product search, filtering, and checkout functionality.

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# 🚀 Features

- Category CRUD Operations
- Product CRUD Operations
- Product Search
- Product Filtering
  - Filter by Category
  - Filter by Price Range
  - Filter by Stock Availability
- Shopping Cart
  - Add Item
  - Update Item Quantity
  - Remove Item
  - View Cart
  - Clear Cart
- Orders
  - Create Order
  - Get All Orders
  - Get Order by ID
  - Update Order Status
- Global Error Handling
- Seed Database
- Postman Collection

---

# 📋 Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later)
- MongoDB (Local or MongoDB Atlas)
- npm

---

# ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Zyad158/E-Commerce-Project.git
```

### 2. Navigate to the project directory

```bash
cd E-Commerce-Project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Run the development server

```bash
npm run dev
```

---

# 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | The port the server will run on |
| MONGO_URI | MongoDB connection string |

---

# 📌 API Endpoints

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create a category |
| PATCH | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products?search=VALUE` | Search products |
| GET | `/api/products?category=VALUE` | Filter by category |
| GET | `/api/products?minPrice=VALUE&maxPrice=VALUE` | Filter by price range |
| GET | `/api/products?category=VALUE&minPrice=VALUE&maxPrice=VALUE` | Filter by category and price |
| GET | `/api/products?inStock=true` | Filter by stock availability |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart?sessionId=VALUE` | View cart |
| POST | `/api/cart/items` | Add product to cart |
| PATCH | `/api/cart/items/:productId?sessionId=VALUE` | Update item quantity |
| DELETE | `/api/cart/items/:productId?sessionId=VALUE` | Remove item from cart |
| DELETE | `/api/cart?sessionId=VALUE` | Clear cart |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders?sessionId=VALUE` | Create order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| PATCH | `/api/orders/:id/status` | Update order status |

---

# 📁 Project Structure

```text
.
├── config/             # Configuration files
├── controllers/        # Route controllers
├── db/                 # Database connection
├── middlewares/        # Custom middlewares
├── models/             # Mongoose models
├── routes/             # API routes
├── utils/              # Utility functions
├── .env.example
├── .gitignore
├── app.js              # Application entry point
├── seed.js             # Seed script
├── package.json
└── README.md
```

---

# ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# 👨‍💻 Author

**Zyad Sadeq**

GitHub: https://github.com/Zyad158