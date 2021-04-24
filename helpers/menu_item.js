const MenuItem = require("../models/MenuItem");

/**
 * Get the menu items matching the ids in the array.
 * 
 * @param {string[]} menuItemIds 
 */
async function getMenuItemsByIds(menuItemIds) {
    let menuItemDetails = [];
    try {
        menuItemDetails = await MenuItem.find({
            "_id" : {
                $in: menuItemIds
            }
        }).exec();
    } catch(error) {
        throw error;
    }
    return menuItemDetails;
}

module.exports = {
    getMenuItemsByIds
}