import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import store from '../redux/store';

const mapStateToProps = (state) => {
  return {isLoggedIn: Boolean(state.auth.email) && Boolean(state.auth.token)};
};

const GuardedRoute = (props) => {
  var {isLoggedIn, component, ...routeProps} = props;
  const Component = component;
  store.subscribe(() => {
    const newState = store.getState();
    isLoggedIn = Boolean(newState.auth.email) && Boolean(newState.auth.token);
  });

  return (
    <Route
      {...routeProps}
      render = {(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to={{path:"/login"}} />;
      }}
    />
  );
}

export default connect(mapStateToProps)(GuardedRoute);