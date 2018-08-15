const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    name: {
        type: String,
        required: true,
        index: true
    },
    genre: {
        type: String
    },
    authorId: {
        type: String
    }
});

const Book = mongoose.model('books', bookSchema);

module.exports = Book;