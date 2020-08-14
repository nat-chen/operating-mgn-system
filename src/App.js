import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import router from '@router';
import Login from './pages/login';

export default class extends React.Component {
  recurseRouter(router, props, index) {
    if (!router.subRoutes || router.subRoutes.length === 0) {
      return <router.component key={index} {...props} />
    } else {
      return router.subRoutes.map((route, routeIndex) => (
        <Switch key={routeIndex}>
          <Route
            // exact
            path={route.path}
            render={props => this.recurseRouter(route, props, routeIndex)}
          />
        </Switch>
      ))
    }
  }

  render() {
    return (
      <Router>
        { router.map((route, index) =>
          <Switch key={index}>
            <Route
              path={route.path}
              render={props => <route.component {...props} />}
            />
        </Switch>
        )}
      </Router>
    )
  }
};