require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./database/connection');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('*', (req, res) => {
    res.json({
        success: true,
        message: 'capt-commerce API'
    })
})

sequelize.authenticate().then(() => {
    console.log('Connection to postgre database has been established successfully.');

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is listening on http://127.0.0.1:${port}`);
    })
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})