import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
      selectedMovie: null
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

  render() {
    const { movies, selectedMovie } = this.state;

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