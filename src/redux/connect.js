import { connect } from 'react-redux'

// static async connect(toProps, select, inject) {
//   return toProps(
//     await select(auth),
//     await inject(authActions)
//   )
// }

export function getComponent() {
  return 'component'
}

export function toProps(selected, injected) {
  const mapStateToProps = selected
  const mapDispatchToProps = Object.assign({}, ...injected)
  return connect(mapStateToProps, mapDispatchToProps)(getComponent())
}

export function select(selectors) {
  return new Promise((resolve, reject) => {
    createSelector(...selectors, (props) => {
      resolve(props)
    })
  })
}

export function inject(actions) {
  return {...actions}
}