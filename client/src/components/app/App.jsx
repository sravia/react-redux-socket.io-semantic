import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from '../PrivateRoute';
import history from '../../history';
import ChatContainer from '../../containers/Chat';
import AuthorizationContainer from '../../containers/Authorization';

const App = props => {
  const { authorized } = props;

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={AuthorizationContainer} exact />
        <PrivateRoute
          authorized={authorized}
          path="/chat"
          component={ChatContainer}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorized: PropTypes.bool
};

App.defaultProps = {
  authorized: false
};

export default App;
