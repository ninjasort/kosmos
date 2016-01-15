import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'
import useSheet from 'react-jss'

const styles = {
  header: {}
}

class Header extends Component {
  
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    selectPriority: PropTypes.func
  };

  handleSave(text, priority) {
    if (text.length !== 0) {
      console.log(text, priority);
      this.props.addTodo(text, priority)
    }
  }

  render() {
    let { classes } = this.props.sheet;

    return (
      <header className={classes.header}>
        <h1>Kosmos</h1>
      </header>
    )
  }
}

export default useSheet(Header, styles)