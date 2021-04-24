const  CronJob = require("cron").CronJob;
const Order = require("../models/Order");

/**
 * This runs every 10 second and checks for any order with delivery time less than current time.
 * Finally updates the status to "ready" and notifies the users using socket.
 */

function orderScheduler(clientSocketConnections) {
    const job = new CronJob("*/10 * * * * *", async () => {
        const ordersPrepared = await Order.find({
            deliveryTime: {
                $lte: new Date()
            },
            status: "preparing"
        }).exec();
        const orderItemIds = ordersPrepared.map(({_id}) => _id.toString());
        try {
            await Order.updateMany({
                _id:  {
                    $in: orderItemIds
                }
            }, {
                status: "ready"
            });
        } catch(error) {
            console.error(error);
        }

        if(ordersPrepared.length > 0) {
            Object.keys(clientSocketConnections).forEach(socketKey => {
                const socket = clientSocketConnections[socketKey];
                socket.send("Your order is ready");
            });
        }
        
    });
    
    job.start();
};
module.exports = orderScheduler;