const router = require("express").Router();
const Order = require("../models/Order");
const orderHelpers = require("../helpers/order");
const menuItemHelpers = require("../helpers/menu_item");

router.get("/details/:id", (req, res) => {

});

router.post("/create", async (req, res) => {
    const newObj = req.body;
    let menuItemDetailsList = [];
    try {
        const menuItemIds = newObj.orderedItems.map(({itemId}) => itemId);
        menuItemDetailsList = await menuItemHelpers.getMenuItemsByIds(menuItemIds);
    } catch(error) {
        throw error;
    }

    newObj.totalBill = 0
    try {
        newObj.totalBill = await orderHelpers.getTotalBill(newObj.orderedItems, menuItemDetailsList);
    } catch(error) {
        throw error;
    }
    const totalPreparationTime = orderHelpers.getTotalPreparationTime(newObj.orderedItems, menuItemDetailsList);
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
        throw error;
    }

    return res.send(createdOrder);
});

module.exports = router;