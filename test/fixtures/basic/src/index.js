import React from 'react'
import { Route } from 'react-router'
import App from './app'

export default (getState) => (
  <Route path='/' component={App} />
)