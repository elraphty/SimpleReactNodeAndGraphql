const express = require('express');
const graphHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

/**
 * Making mongoose use Promise mongoose use callbacks as default
 */
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/graphdb2',{
    useNewUrlParser: true
})
    .then(() => {
        console.log("MongoDb connected successfully");
    })
    .catch(err => {
        console.log(err);
    });


const PORT = process.env.PORT || 5000;

const app = express();

// Allow cross origin request
app.use(cors());

// MAKING EXPRESS USE GRAPHQL
/**
 * BY default express does not understand graphql unless u use the express graphql middleware
 */
app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () =>{
    console.log(`App Listening on ${PORT}`);
});