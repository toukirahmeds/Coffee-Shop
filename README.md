# Coffee-Shop

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
    "name": "string",
    "price" : "number",
    "taxRate" : "number",
    "discountOffer" : {
        "orderedWithItemId" : "string",
        "discountPercentage" : "number"
    }
}
```

### Get menu item details
To get the details of a menu item, make a "GET" request using postman to the url "http://localhost:3000/menu_items/details/${itemId}"
where "itemId" is the _id value of the item in the database.

### Get menu item list
To get the menu item list, make a "Get" request using postman to the url "http://localhost:3000/menu_items/list"


### Create an Order
To create an order, make a "POST" request using postman to the url "http://localhost:3000/orders/create" with the payload:
```
{
    "customerName": "string",
    "orderedItems" : [{
        "itemId" : "string",
        "quantity" : "number"
    }]
}
```
