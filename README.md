# Cartology

A fun and simple shopping cart application

## Hosted Application

[Link to app](https://cartology-pdp.web.app)

# Features

- A form to add/update products
- Supports CRUD operations for products
- True implementation of pagination for products - that is they are not fetched all at once rather are fetched on demand and then cached. So, on page 1 you will only be pulling products that are visible on page 1 and not all products.

```javascript
/** The query being run to fetch products */
const q = query(
  collection(db, PRODUCT_COLLECTION),
  orderBy('createdAt'),
  startAfter(lastVisible || 0),
  limit(itemsPerPage)
);
```

- Added a button that display's silly dad jokes if you're bored :D

## Tech Used

- React
- Vite
- Firebase

## Documentation of the MyFirebase module

### Overview

This module provides a set of functions to interact with Firebase Firestore for managing a collection of products. It includes functions for retrieving, adding, updating, and deleting products, as well as fetching products with pagination.

## Functions

### `MyFirebase`

- **Description**: Constructor function that initializes the Firebase app and Firestore database.
- **Parameters**: None.
- **Returns**: An object with methods for interacting with the products collection.

### `getProducts`

- **Description**: Retrieves all products from the Firestore collection.
- **Parameters**: None.
- **Returns**: An array of product objects.

### `getProductsWithinLimits`

- **Description**: Fetches a limited number of products for pagination, starting after the last visible product from the previous fetch.
- **Parameters**:
  - `lastVisible`: The last product document from the previous fetch. Used for pagination.
  - `itemsPerPage`: The number of products to fetch in one page.
- **Returns**: An object containing an array of new product objects and the last visible product document for the next pagination.

### `addProduct`

- **Description**: Adds a new product to the Firestore collection.
- **Parameters**:
  - `product`: The product object to be added.
- **Returns**: The added product object.

### `deleteProduct`

- **Description**: Deletes a product from the Firestore collection.
- **Parameters**:
  - `id`: The ID of the product to be deleted.
- **Returns**: None.

### `updateProduct`

- **Description**: Updates the details of an existing product in the Firestore collection.
- **Parameters**:
  - `id`: The ID of the product to be updated.
  - `updatedProductDetails`: An object containing the updated details of the product.
- **Returns**: The updated product details object.

### `getTotalCountOfProducts`

- **Description**: Retrieves the total number of products in the Firestore collection.
- **Parameters**: None.
- **Returns**: The total count of products.

## Usage

```javascript
import { myFirebase } from './path/to/this/file';

async function main() {
  // Get all products
  const products = await myFirebase.getProducts();
  console.log(products);

  // Add a new product
  const newProduct = await myFirebase.addProduct({
    name: 'New Product',
    price: 10
  });
  console.log(newProduct);

  // Update a product
  const updatedProduct = await myFirebase.updateProduct('productId', {
    price: 15
  });
  console.log(updatedProduct);

  // Delete a product
  await myFirebase.deleteProduct('productId');

  // Get total count of products
  const totalCount = await myFirebase.getTotalCountOfProducts();
  console.log(totalCount);
}

main();
```

## Getting Started

To test Cartology UI locally, follow these steps:

- Clone the repository to your local machine.
  `git clone https://github.com/agnibha-chatterjee/sqlite-ui.git`
- Install the required dependencies.
  `npm install`
- Start the application server.
  `npm run dev`
- Access the application through your web browser at the specified address.

## Walkthrough

[![IMAGE ALT TEXT](http://img.youtube.com/vi/iWqYAOOvilk/0.jpg)](http://www.youtube.com/watch?v=iWqYAOOvilk 'Cartology')

## Liscense

This project is licensed under the MIT License - see the LICENSE file for details.
