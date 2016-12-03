import test from 'ava'
import version from '../src/version'

test.cb('should read package.json', t => {
  t.is(version(), '0.1.1')
  t.end()
})