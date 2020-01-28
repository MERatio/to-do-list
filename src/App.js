import React, { Component } from 'react';
import TodoList from './components/TodoList';
import Options from './components/Options';
import AddTodo from './components/AddTodo';
import uuid from 'uuid'; // For generating random id
import './App.scss'; // Just install node-sass and create-react-app will parse sass to css (and add vendor prefixes)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [], // If there is no todos in the localStorage(coerce to false), set the todos into empty array
      filterType: 'all'
    };
    this.updateTodos = this.updateTodos.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeFilterType = this.changeFilterType.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // Update the localStorage and the todos in the state
  updateTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos)); // localStorage only accepts string
    this.setState({ todos }); // Updating the localStorage does not re-render React component
  }

  // Get the text from the and add a new todo
  addNewTodo(text) {
    let { todos } = this.state;
    const newTodo = {
      id: uuid.v4(),
      text,
      isComplete: false
    };
    todos = [...todos, newTodo];
    this.updateTodos(todos);
  }

  // Handle the change of isComplete in the state
  handleStatusChange(id) {
    let { todos } = this.state;
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        this.updateTodos(todos);
        return;
      }
    });
  }

  // Change the text of a todo
  handleTextChange(id) {
    let newText = window.prompt('Input a new text', '');
    if (!newText) return;
    let { todos } = this.state;
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.text = newText;
        this.updateTodos(todos);
        return;
      }
    });
  }

  // Handle deletion of a todo
  handleDelete(id) {
    let { todos } = this.state;
    todos = todos.filter(todo => todo.id !== id);
    this.updateTodos(todos);
  }

  changeFilterType(filterType) {
    this.setState({ filterType });
  }

  // Delete all todos in the localStorage and state
  handleReset() {
    if (this.state.todos.length < 1) return;
    let confirm = window.confirm('Do you really want to delete all todos?');
    return confirm ? this.updateTodos([]) : null;
  }

  render() {
    let { todos, filterType } = this.state;
    let filteredData;

    let todosLeft = 0;

    todos.forEach(todo => {
      if (!todo.isComplete) todosLeft++;
    });

    // Show the todos depending on the filterType
    switch (filterType) {
      case 'all':
        filteredData = todos;
        break;
      case 'complete':
        filteredData = todos.filter(todo => todo.isComplete);
        break;
      case 'incomplete':
        filteredData = todos.filter(todo => !todo.isComplete);
        break;
      default:
        filteredData = todos;
    }

    return (
      <main className="app">
        <div className="container">
          <TodoList
            todos={filteredData}
            handleStatusChange={this.handleStatusChange}
            handleTextChange={this.handleTextChange}
            handleDelete={this.handleDelete}
          />
          <Options
            filterType={filterType}
            changeFilterType={this.changeFilterType}
            handleReset={this.handleReset}
          />
          <div className="bottom">
            <AddTodo addNewTodo={this.addNewTodo} />
            <div className="todos-left">
              <p className="todos-left-text">{`${todosLeft} to-dos left`}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
