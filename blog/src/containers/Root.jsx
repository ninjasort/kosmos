import React, { Component, PropTypes } from 'react'
import * as TodoActions from '../actions/todos'
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import Home from '../components/Home'
import About from '../components/About';

export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    actions: PropTypes.object
  };
  
  render () {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path='/' component={Home}></Route>
          <Route path='/about' component={About}></Route>
        </Router>
      </Provider>
    )
  }
}