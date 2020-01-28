import React from 'react';
import Todo from './Todo';
import PropTypes from 'prop-types';

function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          handleStatusChange={props.handleStatusChange}
          handleTextChange={props.handleTextChange}
          handleDelete={props.handleDelete}
        />
      ))}
    </ul>
  );
}

// type check props
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default TodoList;
