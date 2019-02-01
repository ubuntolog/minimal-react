import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory, hashHistory, Link } from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {compose, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import Alert from 'react-s-alert';

require('react-s-alert/dist/s-alert-default.css');
require('react-s-alert/dist/s-alert-css-effects/slide.css');

import rootReducers from './actions/reducers';
import {fetchApiInfo} from './actions/actions';

import {Grid, Row, Col, Button, Navbar, Well, Image} from 'react-bootstrap';

import {RegistrationContainer} from './containers/RegistrationContainer';
import Graph from './components/Graph';
import ErrorMessage from './components/ErrorMessage';

require('../app/css/app.css');


const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    || (f => f);

const middleware = compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        // createLogger(),
    ),
    devTools
);
const store = createStore(rootReducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);


class Frame extends React.Component {
    constructor(props) {
        super(props);
    }

    inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    render() {
        return (
            <div>
            <Row>  
                <Col> 
                    <Well bsSize="large">
                        <Row style={{margin:5}}>  
                            <Col xs={2} sm={2} md={2} lg={2}> 
                                <Image src="/images/house.svg" responsive />
                            </Col>    
                            <Col xs={10} sm={10} md={10} lg={10}>
                                <h2>Minimal React Application</h2>
                            </Col>
                        </Row>
                    </Well>
                </Col>
            </Row>
            <Row>
                <Col className="pull-center">
                    {this.props.children}
                </Col>
            </Row>
            </div>
       )
    }
}
Frame = connect(s => s)(Frame);

class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(fetchApiInfo());
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path={window.APP_CONTEXT_PATH+'/'} component={Frame}>
                            <IndexRoute component={Graph}/>                            
                            <Route path={window.APP_CONTEXT_PATH+'/registration'} component={RegistrationContainer} />                        
                            <Route path='*' component={NotFound} />
                        </Route>
                    </Router>

                    <Alert stack={{limit:5}}/>
                </div>
            </Provider>
        );
    }
}

const NotFound = () => (
    <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="pull-center">
            <ErrorMessage title={"Page not found"} content={<p>The requested page does not exist. Please check the URL or try to start from the <a href={window.APP_CONTEXT_PATH+"/"}>main page</a></p>} />
        </Col>
    </Row>
);

render(<App />, document.getElementById('react') );
