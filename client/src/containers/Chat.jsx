import { connect } from 'react-redux';
import * as reduxForm from 'redux-form';
import * as socketActionsCreator from '../actions/socket';
import * as userActionsCreator from '../actions/user';
import Chat from '../components/chat/Chat';

const mapStateToProps = state => ({
  messages: state.socket.messages,
  user: state.user,
  users: state.socket.users
});

const mapDispatchToProps = {
  sendMessage: socketActionsCreator.sendMessage,
  logout: userActionsCreator.logout,
  formReset: reduxForm.reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
