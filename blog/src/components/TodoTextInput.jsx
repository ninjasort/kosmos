import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
      priority: this.props.priority || 'low'
    }
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    const priority = this.state.priority;
    if (e.which === 13) {
      this.props.onSave(text, priority)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  handleSelectChange(e) {
    this.setState({ priority: e.target.value });
  }

  render() {
    return (
      <div>
        <input className={
          classnames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })}
          type="text"
          placeholder={this.props.placeholder}
          autoFocus="true"
          value={this.state.text}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}
