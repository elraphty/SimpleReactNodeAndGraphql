import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

// Function to fetch graphql books data from server
  displayAuthors(){
    let data = this.props.getAuthorsQuery;
    if(data.loading){
      return (<option disabled>loading authors....</option>);
    }else{
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }
  
  // Function to post graphql books data to server
  submitForm(e){
    e.preventDefault();
    let data = this.state;
    this.props.addBookMutation({
      variables: {
        name: data.name,
        genre: data.genre,
        authorId: data.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]  
    });

    this.setState({name: "", genre: "", authorId: ""});
  }

  render() {
  return (
    <div>
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book Name: </label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } value={this.state.name} required/>
        </div>

        <div className="field">
          <label>Genre: </label>
          <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } value={this.state.genre} required/>
        </div>

        <div className="field">
          <label>Author: </label>
          <select onChange={ (e) => this.setState({ authorId: e.target.value }) } value={this.state.authorId} required>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
    );
  }

}

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)
(AddBook);