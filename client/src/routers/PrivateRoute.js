import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: TheComponent, authorized }) => (
        <Route render={props => (authorized === false || !authorized) ?
            (
            <Redirect to={{pathname: '/', state: { from: props.location }}}/>
            ) :
            (
            <TheComponent {...props} />
            )
          }
        />
);

export default PrivateRoute;