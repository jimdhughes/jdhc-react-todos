import React from 'react';
import { useStateValue } from '../context/StateProvider';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './TodoItem.css';
import TodoStore from '../store/TodoStore';

const TodoItem = todo => {
  const [{}, dispatch] = useStateValue();

  const deleteTodo = async () => {
    await TodoStore.todos
      .where('id')
      .equals(todo.id)
      .delete();
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  const toggleTodo = async () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
    await TodoStore.todos.put(todo);
  };

  return (
    <ListItem
      key={todo.id}
      className={todo.isCompleted ? styles.complete : ''}
      button
      dense
      onClick={toggleTodo}
    >
      <Checkbox checked={todo.isCompleted} />
      <ListItemText primary={todo.title} />
      <ListItemSecondaryAction>
        <IconButton onClick={deleteTodo}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
