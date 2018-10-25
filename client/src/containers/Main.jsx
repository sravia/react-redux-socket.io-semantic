import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm';
import * as userActionsCreator from '../actions/user';

export class Main extends Component {
  onSubmit = e => {
    const { userActions } = this.props;
    return userActions.login(e.name);
  };

  render() {
    const { error, authorized } = this.props;
    if (authorized) return <Redirect to="/chat" />;

    return (
      <div className="ui centered middle aligned four column grid login">
        <div className="row">
          <div className="column">
            <div className="ui segment">
              <LoginForm serverError={error} onSubmit={this.onSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  authorized: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired,
  error: PropTypes.string
};

Main.defaultProps = {
  error: ''
};

const mapStateToProps = state => ({
  error: state.user.error,
  authorized: state.user.authorized
});

const mapDispatchToProps = (dispatch, state) => ({
  userActions: bindActionCreators(userActionsCreator, dispatch, state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
