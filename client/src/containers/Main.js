import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../actions/user';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm';
import PropTypes from 'prop-types';

export class Main extends Component {
  onSubmit = (e) => {
    return this.props.userActions.login(e.name);
  }

  render() {
    const { error, authorized } = this.props;
    if (authorized) return (<Redirect to='/chat' />);

    return (
      <div className='ui centered middle aligned four column grid login'>
        <div className='row'>
          <div className='column'> 
            <div className='ui segment'>
              <LoginForm serverError={error} onSubmit={this.onSubmit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error,
    authorized: state.user.authorized
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    userActions: bindActionCreators(userActions, dispatch, state)
  }
}

Main.propTypes = {
  authorized: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
