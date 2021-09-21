import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './director-view.scss';
import { Card } from 'react-bootstrap';

export class DirectorView extends React.Component {
    
  render() {

    const { director, onBackClick } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="director-view">
            <Card.Body>
              <Card.Title className="director-name">{director.Name}</Card.Title>
              <Card.Text className="director-bio">{director.Bio}</Card.Text>
              <Button variant="primary" type="submit" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired
};