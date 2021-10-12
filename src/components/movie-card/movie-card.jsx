import React from 'react';
import axios from 'axios';
import config from '../../config';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  addToFavorites(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.post(`${config.API_URL}/users/${user}/movies/${movie._id}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        alert(movie.Title + " has been added to your favorites!");
        window.location.reload(false);
      })
  }

  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card">
        <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button onClick={() => this.addToFavorites(movie)}>Add to Favorites</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};