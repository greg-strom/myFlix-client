import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';
import { Card } from 'react-bootstrap';

export class MovieView extends React.Component {
    
  render() {

    const { movie, onBackClick } = this.props;
/*
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <Button variant="primary" type="submit" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
        </Col>
      </Row>
    );
*/
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="movie-view">
            <Card.Img variant="top" className="movie-poster" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title className="movie-title">{movie.Title}</Card.Title>
              <Card.Text className="movie-description">{movie.Description}</Card.Text>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
              <Button variant="primary" type="submit" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};