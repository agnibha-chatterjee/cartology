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
