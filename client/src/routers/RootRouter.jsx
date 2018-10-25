import React, { PureComponent } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import history from '../history';
import MainContainer from '../containers/Main';
import ChatContainer from '../containers/Chat';

export class RootRouter extends PureComponent {
  render() {
    const { authorized } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={MainContainer} exact />
          <PrivateRoute
            authorized={authorized}
            path="/chat"
            component={ChatContainer}
          />
        </Switch>
      </Router>
    );
  }
}

RootRouter.propTypes = {
  authorized: PropTypes.bool
};

RootRouter.defaultProps = {
  authorized: false
};

const mapStateToProps = state => ({ authorized: state.user.authorized });

export default connect(mapStateToProps)(RootRouter);
