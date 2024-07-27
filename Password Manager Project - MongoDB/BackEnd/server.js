const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PswdNU';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();

// Get all the Passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save all the Passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password);
    res.send({ success: true , Result: findResult})
})

// Delete Password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true , Result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})