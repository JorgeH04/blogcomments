const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false 
  }) 
      .then(db => console.log(`DB is connected`))
      .catch(err => console.error(err));  
