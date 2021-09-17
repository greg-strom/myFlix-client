import config from '../../config';
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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
  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get(`${config.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
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
      <>
        <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <Row className="justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
            : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }}/>
                </Col>
            ))
          }
        </Row>
      </>
    );
  }
}

export default MainView;