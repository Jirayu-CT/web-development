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
        res.json({
            message: 'Create category successfully!',
            data: catagory
        })
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

        res.json({
            message: 'List category successfully!',
            data: category
        });
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

        res.json({
            message: 'Delete category successfully!',
            data: category
        });
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}