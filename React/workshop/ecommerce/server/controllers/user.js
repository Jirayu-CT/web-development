const prisma = require("../config/prisma");

exports.listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        res.send(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: get all users' });
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body;
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                enabled: enabled
            }
        })
        res.send('User status updated successfully!');
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: changeStatus' });
    }
}

exports.changeRole = async (req, res) => {
    try {

        const { id, role } = req.body;
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role
            }
        })
        res.send('User role updated successfully!');
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: changeRole' });
    }
}

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body;


        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id)
            }

        })

        // Delete old cart items
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id
                }
            }
        })

        //Delete old cart
        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id
            }
        })

        // เตีรยมข้อมูลใหม่
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        }))

        // หาผลรวมของสินค้าในตะกร้า
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0)

        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })

        res.send('User Added to cart successfully!');
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: userCart' });
    }
}

exports.getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        console.log(cart);
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: getUserCart' });
    }
}

exports.emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            }
        })
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        await prisma.productOnCart.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        const result = await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        console.log('Cart deleted:', result);

        console.log(cart);
        res.json({
            message: 'Cart deleted successfully!',
            deletedCount: result.count
        })
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: emptyCart' });
    }
}

exports.saveAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })

        res.json({
            ok: true,
            message: 'Address saved successfully!',
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: saveAddress' });
    }
}

exports.saveOrder = async (req, res) => {
    try {
        //step1: get user cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: true
            }
        })

        //step2: check empty
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'Cart not found or empty'
            });
        }

        //step3: check quantity
        for (const item of userCart.products) {
            const product = await prisma.product.findUnique({
                where: {
                    id: item.productId
                },
                select: {
                    quantity: true,
                    title: true
                }
            })

            if (!product || item.count > product.quantity) {
                return res.status(400).json({
                    ok: false,
                    message: `Product ${product?.title || ''} is out of stock!`
                });
            }
            console.log('product check:', product);
        }

        //step4: create order
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderedBy: {
                    connect: {
                        id: req.user.id
                    }
                },
                cartTotal: userCart.cartTotal
            }
        });
        
        //step5: update product
        const update = userCart.products.map((item) => ({
            where: {
                id: item.productId
            },
            data: {
                quantity: {
                    decrement: item.count
                },
                sold: {
                    increment: item.count
                }
            }
        }))
        
        console.log('update:', update);
        await Promise.all(
            update.map((updated) => {
                return prisma.product.update(updated)
            })
        )

        // //step6: delete cart
        await prisma.cart.deleteMany({
            where: {
                orderedById: req.user.id
            }
        })

        res.json({
            ok: true,
            message: 'Order saved successfully!',
            order: order
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: saveOrder' });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!orders || orders.length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'Orders not found or empty'
            });
        }

        res.json({
            ok: true,
            message: 'Orders fetched successfully!',
            orders: orders
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error: getOrders' });
    }
}