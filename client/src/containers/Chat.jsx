import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as reduxForm from 'redux-form';
import Messages from '../components/Messages';
import Users from '../components/Users';
import MessageForm from '../components/MessageForm';
import * as socketActionsCreator from '../actions/socket';
import * as userActionsCreator from '../actions/user';

export class Chat extends Component {
  handleLogout = () => {
    const { userActions } = this.props;
    userActions.logout();
  };

  onSubmit = e => {
    const { socketActions, form, name } = this.props;
    socketActions.sendMessage(e.message, name);
    form.reset('messageForm');
  };

  render() {
    const { name, messages, users } = this.props;
    return (
      <div className="ui centered grid chat">
        <div className="row">
          <div className="four wide column">
            <button
              type="button"
              className="ui negative button fluid"
              onClick={this.handleLogout}
            >
              Log out
            </button>
            <div className="ui segment">
              <Users users={users} />
            </div>
          </div>
          <div className="ten wide column">
            <div className="ui segment">
              <Messages messages={messages} name={name} />

              <div className="row">
                <MessageForm onSubmit={this.onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  socketActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.socket.messages,
  name: state.user.name,
  users: state.socket.users
});

const mapDispatchToProps = (dispatch, state) => ({
  socketActions: bindActionCreators(socketActionsCreator, dispatch, state),
  userActions: bindActionCreators(userActionsCreator, dispatch, state),
  form: bindActionCreators(reduxForm, dispatch, state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
