import { connect } from 'react-redux';
import * as userActionsCreator from '../actions/user';
import { Authorization } from '../components/authorization/Authorization';

const mapStateToProps = state => ({
  error: state.user.error,
  authorized: state.user.authorized
});

const mapDispatchToProps = {
  login: userActionsCreator.login,
  logout: userActionsCreator.logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorization);
