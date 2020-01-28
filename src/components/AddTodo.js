import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Change the text in the state of AddTodo depending on the value of the input field
  handleInputChange = e => this.setState({ text: e.target.value });

  // Handle submition of the form
  handleSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    if (!text) return;
    this.props.addNewTodo(text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form className="add-todo" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input-todo"
          onChange={this.handleInputChange}
          value={this.state.text}
          placeholder="Add a to-do"
          minLength="1"
          maxLength="22"
        />
        <button type="submit" className="btn btn-submit">
          <i className="fas fa-plus-circle fa-3x"></i>
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired
};

export default AddTodo;
