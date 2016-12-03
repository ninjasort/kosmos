import test from 'ava'
import { resolve } from 'path'
import Kosmos from '../src'

let basePath, server

test.before(t => {
  basePath = resolve(__dirname + '/fixtures/basic')
  server = new Kosmos({ basePath })
})

test.todo('creates a store')

test.todo('connects a component state to props')

test.todo('connects a component dispatch to props')