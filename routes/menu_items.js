const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

router.post("/create", async (req, res) => {
    const newItem = new MenuItem(req.body);
    const validationError = newItem.validateSync();
    if(validationError) {
        return res.status(500).send(validationError);
    }

    try {
        await newItem.save();
    } catch(error) {
        throw error;
    }

    return res.end("New Item Created Successfully");
    
});

router.get("/details/:id", async (req, res) => {
    const itemId = req.params.id;
    let itemDetails;
    try {
        itemDetails = await MenuItem.findById(itemId).exec();
    } catch(error) {
        throw error;
    }

    if(!itemDetails) {
        return res.status(404).send("Item Not Found");
    }

    return res.send(itemDetails);
});

router.get("/list", async (req, res) => {
    let itemList = [];
    try {
        itemList = await MenuItem.find().exec();
    } catch(error) {
        throw error;
    }

    return res.send(itemList);
});

module.exports = router;