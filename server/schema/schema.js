const graphql = require('graphql');
const _ = require('lodash');

// Including Mongoose Models 
const Book = require('../models/Book');
const Author = require('../models/Author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
           async resolve(parent, args) {
                return await Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
               return await Book.find({authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            description: "Query for books",
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
           async resolve(parent, args) {
                return await Book.findById(args.id);
            }
        },
        author: {
            description: "Query for authors",
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
           async resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                return await Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args){
                return await Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

             return author.save()
                    .then(res =>  res )
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLID},
                genre: {type: GraphQLString}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

             return book.save()
                    .then(res =>  res )
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});