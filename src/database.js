const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1/jwt-test';

mongoose.connect(URI, {

    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( db => {console.log('MongoDB Conectado')})
    .catch(err => console.error(err));
