const db = require('../config/dbConfig.js');

const getAllPublishers = async (req, res) => {
    try{
        const query = 'SELECT * FROM publisher';
        const [ publisher ] = await db.query(query);

        res.status(200).send({ 
            message: 'publisher retrieved successfully',
            data: publisher
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
}

const addPublishers = async (req, res) => {
    try{
        const { PublisherName, Province } = req.body;

        if (!PublisherName || !Province) {
            return res.status(400).send('PublisherName, Province');
        }

        const query = 'INSERT INTO publisher (PublisherName, Province) VALUES (?, ?)';
        await db.query(query, [ PublisherName, Province ]);

        res.status(201).send({ message: 'publisher added successfully' });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

module.exports = { getAllPublishers, addPublishers };