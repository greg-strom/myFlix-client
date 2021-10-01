import config from '../../config';
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './profile-view.scss';

import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  
  getUser(token) {
    axios.get(`${config.API_URL}/users/` + localStorage.getItem('user'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        }
        );
    });
  }

  handleRemoveFave(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been removed from your favorites!");
        window.location.reload(false);
      })
  }

  handleUnregister() {
    const answer = window.confirm("Are you sure? If you proceed, your account and information will be permanently deleted.");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      axios.delete(`${config.API_URL}/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      })

    } else {
      console.log("That's one happy customer!");
    };
  }


  render() {
    const { movies, user } = this.props;

    //When a user exists with favorite movies, this makes "favoritesList" into an array with all of the user's favorite movies--
    const favoritesList = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id);
    });

    console.log(favoritesList);

    return (
      <Row>
      {favoritesList.map((movie) => {
          return (
            <Col md={4} key={movie._id}>
              <div key={movie._id}>
                <Card className='movie-card'>
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link">Open</Button>
                    </Link>
                    <Button onClick={() => this.handleRemoveFave(movie)}>Remove from Favorites</Button> 
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}

      </Row>
    );
  }
};

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array
  }),
  movies: PropTypes.array.isRequired
};