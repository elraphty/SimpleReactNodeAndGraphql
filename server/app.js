const express = require('express');
const graphHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

// GETTING CONFIG DATA
require('./config/config');

/**
 * Making mongoose use Promise mongoose use callbacks as default
 */
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("MongoDb connected successfully");
    })
    .catch(err => {
        console.log(err);
    });

const app = express();

// Allow cross origin request
app.use(cors());

app.get('/', (req, res, next) => {
    res.send("<h1>Nothing to show here to access the graphiql ui navigate to /graphql </h1>");
});

// MAKING EXPRESS USE GRAPHQL
/**
 * BY default express does not understand graphql unless u use the express graphql middleware
 */
app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT, () =>{
    console.log(`App Listening on ${process.env.PORT}`);
});