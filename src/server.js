const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//bbdd
mongoose.connect('mongodb://jorgehhh:terremototo001+@ds155596.mlab.com:55596/estudio-db')
.then(db => console.log('Db connected'))
.catch(err => console.log(err));


//importing routes
const indexRoutes = require('./routes/index');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'views')));


//routes
app.use('/', indexRoutes);


// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
