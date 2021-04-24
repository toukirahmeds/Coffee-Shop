# Coffee-Shop
### Important
The missing implementations are:
- Unit Tests
- Proper Validation for the request payloads
- Proper implementation of Error-Handling

## Database Design
- ### MenuItem
    ```
    {
        "_id" : "ObjectId", (Unique Mongo Id)
        "name" : "string",
        "price" : "number", (minimum value: 0)
        "taxRate": "number", (0-100)
        "preparationTime" : "number", (seconds)
        "discountOffer" : { 
            "orderedWithItemId": "string",
            "discountPercentage" : "number"
        },
        "createdAt": "DateTime",
        "updatedAt" : "DateTime"
    }
    ```
    
- ### Order
    ```
    {
        "_id" : "ObjectId", (Unique Mongo Id)
        "customerName" : "string",
        "orderedItems" : [{
            "itemId" : "string",
            "quantity" : "number"
        }],
        "totalBill" : "number",
        "deliveryTime" : "DateTime",
        "status": "string" ("preparing", "ready", "delivered")
        "createdAt": "DateTime",
        "updatedAt" : "DateTime"
    }
    ```
## Backend Architecture
- The expressjs framework has been used to develop the backend server.
- Node's npm package "ws" has been used to build the websocket server to handle the sending of notifications to
  the connected clients when the orders are ready for delivery. The better solution would have been using "socket.io" but due to lack of time, I have quickly implemented the socket server with "ws".
- The rest api endpoints are available at the url "http://localhost:3000"
- ### Rest API Endpoints
    - /menu_items/create
        Creates a new menu item.
    - /menu_items/details/:id
        Get the details of the item with id provided inthe route param.
    - /menu_items/list
        Get the list of all the menu items in the database.
    - /orders/create
        Create a new order.
    - /orders/details/:id
        Get the details of the order with id provided in the route param.
- The websocket is available at the url "ws://localhost:4000"


## Installation
- In the parent folder of the project, install the npm dependencies using "npm install"
- Run the node server using "npm start"
- Install the Google Chrome browser plugin Smart Websocket client from "https://chrome.google.com/webstore/detail/smart-websocket-client/omalebghpgejjiaoknljcfmglgbpocdp"
- Open the Smart Websocket and then connect to the server websocket with url "ws://localhost:4000" and then press "connect" button.
- Import the POSTMAN collection given at "https://github.com/toukirahmeds/Coffee-Shop/blob/main/API%20routes.postman_collection.json"

## Features

- Create a menu item
- Get menu item details
- Get menu item list
- Create an order
- Notify users when the order has been prepared

### Create a menu item
To create a menu item in the database, make a "GET" request using postman to the url "http://localhost:3000/menu_items/create"
with the following payload:
```
{
    "name": "string", (required)
    "price" : "number", (required)
    "taxRate" : "number", (required)
    "discountOffer" : { (not required)
        "orderedWithItemId" : "string",
        "discountPercentage" : "number"
    }
}
```
"orderedWithItemId" is the id of the item for which the current item will get the discount.

### Get menu item details
To get the details of a menu item, make a "GET" request using postman to the url "http://localhost:3000/menu_items/details/${itemId}"
where "itemId" is the _id value of the item in the database.

### Get menu item list
To get the menu item list, make a "Get" request using postman to the url "http://localhost:3000/menu_items/list"


### Create an Order
To create an order, make a "POST" request using postman to the url "http://localhost:3000/orders/create" with the payload:
```
{
    "customerName": "string", (required)
    "orderedItems" : [{ (required)
        "itemId" : "string", (required)
        "quantity" : "number" (required)
    }]
}
```

### Get order details
To get the details of an order, make a "GET" request using postman to the url
"http://localhost:3000/orders/details/${orderId}" where orderId is the id of the order.

### Notify users when the order has been prepared
User connected to the websocket server, will automatically get the notification "Your order is ready" when the current time
is more than or equal to the order's delivery time.

