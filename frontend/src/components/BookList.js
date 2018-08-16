import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';
class BookList extends Component {

  constructor(props){
    super(props);

    this.state = {
      selected: null
    }
  }

// Function to fetch graphql books data from server
  displayBooks(){
    let data = this.props.data;
      if(data.loading){
        return (<div className='loading'>loading books....</div>);
      }else{
        return data.books.map(book => {
          return (<li key={book.id} onClick={ (e) => { this.setState({ selected: book.id }) } }>{book.name}</li>);
        });
      }
  }

  render() {
    return (
      <div>
          <ul id="book-list">
            {this.displayBooks()}
          </ul>
          <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
