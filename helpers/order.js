
/**
 * Calculate and return the total bill of the order
 * 
 * @param {object[]} orderedItems 
 * @param {object[]} menuItemDetailsList
 * 
 * @returns {number} 
 */
async function getTotalBill(orderedItems, menuItemDetailsList) {
    
    let totalBill = 0;
    let orderedItem, orderedWithItemExists, quantity, currentBillWithoutTax, currentBillWithTax, taxAmount;
    menuItemDetailsList.forEach(menuItem => {
        // Find the item from the ordered items.
        orderedItem = orderedItems.find(({itemId}) => itemId.toString() === menuItem._id.toString());
        quantity = orderedItem?orderedItem.quantity: 0;
        // Calculate current item's price without tax.
        currentBillWithoutTax = menuItem.price * quantity;
        // If item has discount offer, then check if the item exists for which the current items' discount
        // applies. If that item exists then calculate the discounted bill for the current item.
        if(menuItem.discountOffer && menuItem.discountOffer.orderedWithItemId && menuItem.discountOffer.discountPercentage) {
            orderedWithItemExists = orderedItems.findIndex(({itemId}) => 
                itemId.toString() === menuItem.discountOffer.orderedWithItemId.toString()
            ) > -1;
            if(orderedWithItemExists) {
                currentBillWithoutTax -= currentBillWithoutTax * (menuItem.discountOffer.discountPercentage/100);
            }
        }
        // Calculate the current item's tax.
        taxAmount = currentBillWithoutTax * (menuItem.taxRate/100);
        // Calculate the current item's bill with tax.
        currentBillWithTax = currentBillWithoutTax + taxAmount;
        totalBill += currentBillWithTax;
    });
    return totalBill;
}

/**
 * Calculate the total preparation time for the order in seconds.
 * 
 * @param {object[]} orderedItems 
 * @param {object[]} menuItemDetailsList
 * 
 * @returns {number} In Seconds
 */
function getTotalPreparationTime(orderedItems, menuItemDetailsList) {
    let totalPreparationTime = 0;
    let orderedItem, quantity
    menuItemDetailsList.forEach(menuItem => {
        orderedItem = orderedItems.find(({itemId}) => itemId.toString() === menuItem._id.toString());
        quantity = orderedItem?orderedItem.quantity: 0;
        totalPreparationTime += menuItem.preparationTime * quantity; 
    });
    return totalPreparationTime;
}


module.exports = {
    getTotalBill,
    getTotalPreparationTime
};
