const graphql = require('graphql');

// Including Mongoose Models 
const Book = require('../models/Book');
const Author = require('../models/Author');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
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
            /** Query the database for the author details
            *   This can also be achieved by using relationship i.e ref in mongoose
            *   Making authorId a ref of authors collection 
            */
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
               return await Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    description: "Graphql Queries are used fetching data",
    name: "RootQueryType",
    fields: {
        book: {
            description: "Query for book with id, you must provide book id",
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
           async resolve(parent, args) {
                return await Book.findById(args.id);
            }
        },
        author: {
            description: "Query for author",
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
           async resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                return await Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    description: "Graphql Mutations are used for crud operations",
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

             return author.save()
                    .then(res =>  res)
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLID },
                genre: { type: GraphQLString }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

             return book.save()
                    .then(res =>  res)
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
}); 

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;