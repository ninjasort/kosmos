import program from 'commander'
import v from '../version'
import { resolve } from 'path'
import Kosmos from '..'

program
  .version(v())
  .option('-b, --base-path [base path]', 'The base path of the app', resolve(process.cwd()))
  .option('-p, --port [number]', 'Port to listen on', 3000)

program.parse(process.argv)

const basePath = program.basePath

// Create new server
const k = new Kosmos({ basePath, hotReload: true })

// Bundle and start listening...
k.listen(program.port)
  .then(() => {
    console.log(`⚡⚡⚡⚡⚡\nkosmos started listening on port => ${program.port}\n⚡⚡⚡⚡⚡`)
  })