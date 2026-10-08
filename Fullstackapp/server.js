const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./connection/dbConnection');
const cors = require('cors')
connectDB();

const app = express();

/*app.get("/", (req, res) => {
    // res.send("<h1>Get all contacts</h2>")
    // res.json({message: "Get all contacts"});  
    res.status(200).json({message: "Get all contacts"});
});*/


/*app.get("/api/contacts/", (req, res) => {
    // res.send("<h1>Get all contacts</h1>")
    // res.json({message: "Get all contacts"});
    res.stats(200).json({message: "Test"});
})*/

app.use(cors());
app.use(express.json());
app.use('/api/contacts/', require('./routes/contactRoutes'));
app.use(errorHandler);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server running en port ${port}`)
})