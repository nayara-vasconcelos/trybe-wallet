import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    const { isLogged } = this.props;

    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/">
          {isLogged ? <Redirect to="/carteira" /> : <Login />}
        </Route>
      </Switch>
    );
  }
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: (state.user.email).length > 0,
});

export default connect(mapStateToProps, null)(App);
