import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './TodoItem.css';
import TodoStore from '../store/TodoStore';

const TodoItem = props => {
  let { todo } = props;
  const [{}, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const deleteTodo = async () => {
    todo.deletedAt = new Date();
    await TodoStore.todos.put(todo);
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  const toggleTodo = async () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
    await TodoStore.todos.put(todo);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    todo = { ...todo, title: editTitle };
    dispatch({ type: 'EDIT_TODO', payload: todo });
    setOpen(false);
    await TodoStore.todos.put(todo);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditTitle(todo.title);
  };

  const handleTodoEdit = e => {
    setEditTitle(e.target.value);
  };

  return (
    <div>
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
          <IconButton onClick={handleClickOpen}>
            <EditIcon></EditIcon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="Edit Todo"
            type="text"
            fullWidth
            value={editTitle}
            onChange={handleTodoEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoItem;
