import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';
import { Card } from 'react-bootstrap';

export class GenreView extends React.Component {
    
  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="genre-view">
            <Card.Body>
              <Card.Title className="genre-name">{genre.Name}</Card.Title>
              <Card.Text className="genre-description">{genre.Description}</Card.Text>
              <Button variant="primary" type="submit" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired
};