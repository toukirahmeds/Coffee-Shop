const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

/**
 * Creates a new menu item.
 */
router.post("/create", async (req, res) => {
    const newItem = new MenuItem(req.body);
    const validationError = newItem.validateSync();
    if(validationError) {
        return res.status(500).send(validationError);
    }

    try {
        await newItem.save();
    } catch(error) {
        return res.status(500).send(error);
    }

    return res.end("New Item Created Successfully");
    
});

/**
 * Get a menu item with route param id.
 */
router.get("/details/:id", async (req, res) => {
    const itemId = req.params.id;
    let itemDetails;
    try {
        itemDetails = await MenuItem.findById(itemId).exec();
    } catch(error) {
        return res.status(500).send(error);
    }

    if(!itemDetails) {
        return res.status(404).end("Item Not Found");
    }

    return res.send(itemDetails);
});

/**
 * Get the list of all the menu items.
 */
router.get("/list", async (req, res) => {
    let itemList = [];
    try {
        itemList = await MenuItem.find().exec();
    } catch(error) {
        return res.status(500).send(error);
    }

    return res.send(itemList);
});

module.exports = router;
