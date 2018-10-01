import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import history from '../history';
import Main from '../containers/Main';
import Chat from '../containers/Chat';

export class RootRouter extends Component {
  render() {
    const { authorized } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route path='/' component={Main} exact/>
          <PrivateRoute authorized={authorized} path='/chat' component={Chat} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => (
  { authorized: state.user.authorized }
);

export default connect(mapStateToProps)(RootRouter);