import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const MessageForm = props => {
  const { handleSubmit, pristine, submitting, onSubmit } = props;
  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="message"
          component="input"
          type="text"
          placeholder="Type a message..."
        />
        <button
          className="ui button teal"
          type="submit"
          disabled={pristine || submitting}
        >
          Send
        </button>
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

MessageForm.defaultProps = {
  onSubmit: null,
  pristine: false,
  submitting: false
};

export default reduxForm({
  form: 'messageForm'
})(MessageForm);
