var mongoose = require('mongoose'),
    mongo = mongoose.connection,
    dbURI = 'mongodb://localhost:27017/rayresto';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongo.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongo.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongo.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    mongo.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

//SCHEMAS & MODELS
require('./../model/schema'); 