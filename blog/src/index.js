import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import { Router, RoutingContext, match } from 'react-router';
import { createHistory, createMemoryHistory } from 'history';
import configureStore from './store/configureStore'
import Root from './containers/Root'

// Client render (optional):
if (typeof document !== 'undefined') {
  const history = createHistory();
  // create our store with initial state
  const store = configureStore(history, window.__INITIAL_STATE__);
  const outlet = document.getElementById('app');

  ReactDOM.render(<Root history={histroy} store={store} />, outlet);
}

// Exported static site renderer:
export default (locals, callback) => {
  const store = configureStore(history, {});
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);
    callback(null, html);
  });
};