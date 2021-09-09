import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    //initial state for all of these parameters set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null
    }
  }

  //this code fetches movie data from my heroku app and puts it in the movies array
  componentDidMount(){
    axios.get('https://cfmovieapp.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*this function is triggered when a movie is clicked.
  It changes the state of the selectedMovie propery to the clicked movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegistration(registered) {
    this.setState({
      registered
    });
  }

  /*When a user logs in, this function changes the user property to that user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    /* This code renders the RegistrationView if the user is not registered.
    Otherwise, we move on. */
    if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />;

    /* This code renders the LoginView if the user is not logged in.
    Otherwise, we move on. */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    /* This code checks whether there is a movie that has been selected.
    If there is, then this displays that movie's details using MovieView;
    if there is not a movie that has been selected, then all movies are displayed
    using MovieCard. */
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView;