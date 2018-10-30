import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Login from './login/Login';

export class Authorization extends PureComponent {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  static defaultProps = {
    error: ''
  };

  render() {
    const { error, authorized, login } = this.props;
    if (authorized) return <Redirect to="/chat" />;

    return (
      <div className="ui centered middle aligned four column grid login">
        <div className="row">
          <div className="column">
            <div className="ui segment">
              <Login serverError={error} onSubmit={e => login(e.name)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authorization;
