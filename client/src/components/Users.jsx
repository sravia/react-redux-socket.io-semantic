import React from 'react';
import PropTypes from 'prop-types';

const Users = props => {
  const { users } = props;
  const userList = users.map(user => <li key={user.name}>{user}</li>);
  return (
    <div>
      <h1>Online users</h1>
      <ul>{userList}</ul>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
