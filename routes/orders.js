const router = require("express").Router();
const Order = require("../models/Order");
const orderHelpers = require("../helpers/order");
const menuItemHelpers = require("../helpers/menu_item");

/**
 * Get the order details using the route param id provided.
 */
router.get("/details/:id", async (req, res) => {
    const orderId = req.params.id;
    let orderDetails;
    try {
        orderDetails = await Order.findById(orderId).exec();
        console.log(orderDetails);
    } catch(error) {
        return res.status(500).send(error);
    }

    if(!orderDetails) {
        return res.status(404).end("Order not found");
    }

    return res.send(orderDetails);
});

/**
 * Create a new order.
 */
router.post("/create", async (req, res) => {
    const newObj = req.body;
    let menuItemDetailsList = [];
    try {
        const menuItemIds = newObj.orderedItems.map(({itemId}) => itemId);
        menuItemDetailsList = await menuItemHelpers.getMenuItemsByIds(menuItemIds);
    } catch(error) {
        return res.status(500).send(error);
    }

    newObj.totalBill = 0
    try {
        newObj.totalBill = await orderHelpers.getTotalBill(newObj.orderedItems, menuItemDetailsList);
    } catch(error) {
        return res.status(500).send(error);
    }
    let totalPreparationTime;
    try {
        totalPreparationTime = orderHelpers.getTotalPreparationTime(newObj.orderedItems, menuItemDetailsList);
    } catch(error) {
        return res.status(500).send(error);
    }

    // Calculate the delivery time of the order.
    const nowTimeMilliseconds = new Date().getTime();
    const deliveryTime = new Date(nowTimeMilliseconds + totalPreparationTime * 1000);
    newObj.deliveryTime = deliveryTime;
    const newOrder = new Order(newObj);
    const validationError = newOrder.validateSync();
    if(validationError) {
        return res.status(500).send(validationError);
    }
    let createdOrder;
    try {
        createdOrder = await newOrder.save();
    } catch(error) {
        return res.status(500).send(error);
    }

    return res.send(createdOrder);
});

module.exports = router;
