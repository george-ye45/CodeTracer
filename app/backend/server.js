let fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./router/router')
const path = require('path')
require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
app.use(cors())


const router = new Router(app)



module.exports = router;





