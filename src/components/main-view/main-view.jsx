import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Leonardo DiCaprio leads a team on a dangerous mission to invade the dreams of a slumbering rich kid.', ImagePath: '../../../img/Inception.jpg'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Wrongly incarcerated for murder, Tim Robbins grapples with existential questions.', ImagePath: '../../../img/Shawshank.jpg'},
        { _id: 3, Title: 'Gladiator', Description: 'Russell Crowe avenges his family against the bozo emperor Commodus in this classic Roman epic.', ImagePath: '../../../img/Gladiator.jpg'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView;