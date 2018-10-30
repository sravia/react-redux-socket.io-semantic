import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages/Messages';
import Users from './users/Users';
import MessageForm from './messageForm/MessageForm';

const Chat = props => {
  const { user, messages, users, logout, sendMessage, formReset } = props;
  return (
    <div className="ui centered grid chat">
      <div className="row">
        <div className="four wide column">
          <button
            type="button"
            className="ui negative button fluid"
            onClick={logout}
          >
            Log out
          </button>
          <div className="ui segment">
            <Users users={users} />
          </div>
        </div>
        <div className="ten wide column">
          <div className="ui segment">
            <Messages messages={messages} user={user} />

            <div className="row">
              <MessageForm
                onSubmit={e => {
                  sendMessage(e.message, user);
                  formReset('messageForm');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  users: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired
};

export default Chat;
