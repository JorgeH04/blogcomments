if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  } 


const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { format } = require('timeago.js');
const engine = require('ejs-mate');


const app = express();

//bbdd
const { mongoose } = require('./database');

//bbddmongodb://localhost/estudio-db
//mongoose.connect('mongodb://localhost/estudio-db')
//.then(db => console.log('Db connected'))
//.catch(err => console.log(err));


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

// Global variables
app.use((req, res, next) => {
app.locals.format = format;
next();
});

//routes
app.use('/', indexRoutes);


// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
