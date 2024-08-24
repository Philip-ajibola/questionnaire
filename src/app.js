const express = require('express');
const sequelize = require('./config/database');
const adminRoutes = require('../src/routes/adminRoute');
const router = require('../src/routes/routes');

const app = express();

app.use(express.json());


app.use('/api', adminRoutes);
app.use('/api', router);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => {
    console.log('Error connecting to the database', error);
});
