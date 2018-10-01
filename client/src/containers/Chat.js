import React, { Component } from 'react';
import { connect } from 'react-redux'
import Messages from '../components/Messages'
import Users from '../components/Users'
import MessageForm from '../components/MessageForm';
import * as socketActions from '../actions/socket';
import * as userActions from '../actions/user';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as reduxForm from 'redux-form';

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.userActions.logout();
    }

    onSubmit(e) {
        this.props.socketActions.sendMessage(e.message, this.props.name);
        this.props.reduxForm.reset('messageForm');
    }

    render() {
        const { name,messages,users } = this.props;
        return (
            <div className='ui centered grid chat'>
                <div className='row'>
                    <div className='four wide column'>
                    <button className='ui negative button fluid' onClick={this.handleLogout}>
                        Log out
                    </button>
                        <div className='ui segment'>
                            <Users users={users}/>
                        </div>
                    </div>
                    <div className='ten wide column'>
                        <div className='ui segment'>
                            <Messages messages={messages} name={name}   />

                            <div className='row'>
                                <MessageForm onSubmit={this.onSubmit}   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      messages: state.socket.messages,
      name: state.user.name,
      users: state.socket.users
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        socketActions: bindActionCreators(socketActions, dispatch, state),
        userActions: bindActionCreators(userActions, dispatch, state),
        reduxForm : bindActionCreators(reduxForm, dispatch, state)
    }
}

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    socketActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);