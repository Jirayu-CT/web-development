const prisma = require("../config/prisma");

exports.create = async (req, res) => {
    //code
    try {
        //code
        const { name } = req.body;
        const catagory = await prisma.category.create({
            data: {
                name: name
            }
        })
        res.send(catagory)
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}



exports.list = async (req, res) => {
    //code
    try {
        //code
        const category = await prisma.category.findMany()

        res.send(category);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


exports.remove = async (req, res) => {
    //code
    try {
        //code
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(category);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}