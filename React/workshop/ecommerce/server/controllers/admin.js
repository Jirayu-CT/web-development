const prisma = require("../config/prisma");

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        const orderUpdate = await prisma.order.update({
            where: { id: orderId },
            data: { orderStatus: orderStatus },
        });

        res.json({
            message: 'Order status updated successfully!',
            orderUpdate
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error: changeOrdereStatus' });
    }
}

exports.getOrderAdmin = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
                orderedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                }
            },
        });


        res.json({
            message: 'Orders fetched successfully!',
            orders: orders
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error: getOrderAdmin' });
    }
}