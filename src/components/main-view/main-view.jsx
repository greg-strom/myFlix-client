import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

/*
const InceptionImg = new URL(
  '../../../dist/img/Inception.jpg',
  import.meta.url
);
const GladiatorImg = new URL(
  '../../../dist/img/Gladiator.jpg',
  import.meta.url
);
const ShawshankImg = new URL(
  '../../../dist/img/Shawshank.jpg',
  import.meta.url
);
*/

class MainView extends React.Component {

  /*
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Leonardo DiCaprio leads a team on a dangerous mission to invade the dreams of a slumbering rich kid.', ImagePath: InceptionImg},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Wrongly incarcerated for murder, Tim Robbins grapples with existential questions.', ImagePath: ShawshankImg},
        { _id: 3, Title: 'Gladiator', Description: 'Russell Crowe avenges his family against the bozo emperor Commodus in this classic Roman epic.', ImagePath: GladiatorImg}
      ],
      selectedMovie: null
    }
  } */

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null
    }
  }

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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;
  
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