import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent.js';

import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder.js';
import Logout from './Containers/Auth/Logout/Logout.js';
import * as action from './store/actions/index.js';
// import Checkout from './Containers/Checkout/Checkout.js';
// import Orders from './Containers/Orders/Orders.js';
// import Auth from './Containers/Auth/Auth.js';

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout.js')
});
const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders.js')
});
const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth.js')
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));