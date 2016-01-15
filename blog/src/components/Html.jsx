import React, { PropTypes, Component } from 'react'

const styles = {
  header: {}
}

class Html extends Component {
  render() {
    return (
      <html>
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
}

export default Html;