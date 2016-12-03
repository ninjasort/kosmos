import path from 'path'
import fs from 'fs'
import config from './config'

const { pkgBasePath } = config

export default () => {
  const pkgPath = path.join(pkgBasePath, '../package.json')
  const f = JSON.parse(fs.readFileSync(pkgPath, {encoding: 'utf-8'}))
  return f.version
}