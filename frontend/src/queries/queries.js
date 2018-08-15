import { gql } from 'apollo-boost';

const getBookQuery = gql`
  query getBookQuery($id: ID){
    book(id: $id){
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
          genre
        }  
      }
    }
  }
`;
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation addBook ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery }