const db = require('../config/dbConfig.js');

// ดึงข้อมูลลูกค้าทั้งหมด
const getAllCustomers = async (req, res) => {
    try {
        const query = 'SELECT * FROM Customer';
        const [customers] = await db.query(query);

        res.status(200).send({
            message: 'Customers retrieved successfully',
            data: customers
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
};

// เพิ่มข้อมูลลูกค้า
const addCustomer = async (req, res) => {
    try {
        const { FullName, CustomerType } = req.body;

        if (!FullName || !CustomerType) {
            return res.status(400).send('FullName and CustomerType are required');
        }

        const query = 'INSERT INTO Customer (FullName, CustomerType) VALUES (?, ?)';
        await db.query(query, [FullName, CustomerType]);

        res.status(201).send({ message: 'Customer added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
};

module.exports = { getAllCustomers, addCustomer };