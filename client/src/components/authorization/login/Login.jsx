import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const Login = props => {
  const { serverError, handleSubmit, pristine, submitting, onSubmit } = props;
  return (
    <div>
      <div className={`ui error message ${serverError ? '' : 'hidden'}`}>
        <div className="header">{serverError}</div>
      </div>
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Provide a name"
        />
        <button
          className="ui button teal fluid"
          type="submit"
          disabled={pristine || submitting}
        >
          Open chat
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  serverError: PropTypes.string
};

Login.defaultProps = {
  handleSubmit: null,
  onSubmit: null,
  pristine: false,
  submitting: false,
  serverError: ''
};

export default reduxForm({
  form: 'loginForm'
})(Login);
