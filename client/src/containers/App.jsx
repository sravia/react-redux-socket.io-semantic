import { connect } from 'react-redux';
import App from '../components/app/App';

const mapStateToProps = state => ({
  authorized: state.user.authorized
});

export default connect(mapStateToProps)(App);
