import React from 'react'
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    const {serverError,handleSubmit, pristine, submitting,onSubmit} = props;
    return (
        <div>
            <div className={'ui error message ' + (serverError ? '' : 'hidden')}>
                <div className='header'>{serverError}</div>
            </div>
            <form className='ui form' onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Provide a name"
                />
                <button className='ui button teal fluid' type="submit" disabled={pristine || submitting} >Open chat</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'loginForm',
})(LoginForm);