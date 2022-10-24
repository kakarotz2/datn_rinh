const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db/index');
const products = require('./routes/products');
const user = require('./routes/user');
const order = require('./routes/order');
const admin = require('./routes/admin');
db.connect();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', products);
app.use('/user', user);
app.use('/order', order);
app.use('/admin', admin);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Server runing');
});
app.listen(PORT, () => {
    console.log(`Server run on https://localhost:${PORT}`);
});
