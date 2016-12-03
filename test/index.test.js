import test from 'ava'
import { resolve } from 'path'
import Kosmos from '../src'

let basePath, server

test.before(t => {
  basePath = resolve(__dirname + '/fixtures/basic')
  server = new Kosmos({ basePath })
})

test.cb('creates a new instance', t => {
  t.is(server instanceof Kosmos, true)
  t.is(typeof server.options, 'object')
  t.end()
})

test.todo('indexes all js files from `src` directory')

test.cb('resolves the correct basePath', t => {
  t.is(server.basePath, resolve(__dirname, './fixtures/basic'))
  t.end()
})

// Webpack Config
// --------------------------------------------------------------------------------

test.todo('webpack config has context')

test.todo('webpack config has entry')

test.todo('webpack config has output')

test.todo('webpack config has plugins')

test.todo('webpack config has loaders')

test.todo('webpack config has a devtool')

test.todo('webpack config has a resolve')

test.todo('webpack config has externals')

test.todo('webpack config has resolve loader')











