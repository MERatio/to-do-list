import React from 'react';
import PropTypes from 'prop-types';

function Todo(props) {
  // Destructure props
  const { id, text, isComplete } = props.todo;
  const { handleStatusChange, handleTextChange, handleDelete } = props;

  // Styling of a todo depending if it is completed or not
  let classes = isComplete
    ? ['circle-check far fa-check-circle fa-2x', 'todo-text todo-text-complete']
    : ['circle-ongoing far fa-circle fa-2x', 'todo-text todo-text-ongoing'];

  return (
    <li className="todo">
      <button className="btn btn-circle" onClick={() => handleStatusChange(id)}>
        <i className={classes[0]}></i>
      </button>
      <p className={classes[1]} onClick={() => handleStatusChange(id)}>
        {text}
      </p>
      <button
        className="btn btn-update"
        onClick={() => handleTextChange(id)}
        title="Change text"
      >
        <i className="fas fa-edit fa-2x"></i>
      </button>
      <button
        className="btn btn-delete"
        onClick={() => handleDelete(id)}
        title="Delete"
      >
        <i className="fas fa-trash fa-2x"></i>
      </button>
    </li>
  );
}

// type check props
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Todo;
