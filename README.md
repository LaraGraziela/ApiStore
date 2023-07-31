# ApiStore

This project is an API for a store, where you can login as user admin or user customer. As an administrator you can register, edit and delete products and as a customer you can view and buy a product.

# Installation

Clone the repository locally and access each folder in a terminal:

```cd apiStore_back ```

```cd apiStore_front ```

- In the apiStore_back repository, run the following commands:

  ```npm install```
  
  ```npx sequelize db:migrate```
  
  ```npm start```

- In the apiStore_front repository, run the following commands:

  ```npm install```
  
  ```npm start```

# Endpoints

### Users

List users: GET ```/users```

Search user by ID: GET ```/user/:id```

Update User by ID: PUT ```/user/:id```

Delete user by ID: DELETE ```/user/:id```

User authentication: POST ```/login```

Register new user: POST ```/register```

### Products

List products: GET ```/products```

Search product by ID: GET ```/product/:id```

Create new product: POST ```/products```

Update Product by ID: PUT ```/product/:id```

Delete product by ID: DELETE ```/product/:id```

# Login instructions

### Admin User
Email: admin@gmail.com

Password: 12345

### Client User:

Email: client@gmail.com

Password: 12345
