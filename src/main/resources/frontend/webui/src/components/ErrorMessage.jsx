import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col, Jumbotron} from 'react-bootstrap';

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid className="container-90-grid">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1>{this.props.title}</h1>
                            {this.props.content}
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

ErrorMessage.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
};

export default ErrorMessage;
