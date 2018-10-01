import React from 'react'
import PropTypes from 'prop-types';

const Users = (props) => {
    const userList = props.users.map((user,index) =>
        <li key={index}>{user}</li>
    );
    return (
        <div>
            <h1>Online users</h1>
            <ul>
                {userList}
            </ul>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users;