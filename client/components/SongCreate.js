import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      //runs the mutation with variables take from the current state
      variables: { title: this.state.title },
      //run the query after mutation is done to make sure react renders changes
      refetchQueries: [{ query: fetchSongsQuery }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>SongTitle:</label>
          <input
            onChange={event => this.setState({ title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

//allows mutation to run with input data, not hard-coded data
const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`;

//adds the mutation to this.props.mutate
export default graphql(mutation)(SongCreate);
