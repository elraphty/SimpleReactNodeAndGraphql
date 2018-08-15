const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema ({
    name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number
    }
});

const Author = mongoose.model('authors', authorSchema);

module.exports = Author;