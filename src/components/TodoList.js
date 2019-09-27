import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import TodoItem from './TodoItem';
import { AppBar, Card, Toolbar, CardContent, TextField, List } from '@material-ui/core';
import TodoStore from '../store/TodoStore';
const TodoList = () => {
  const [{ todos }, dispatch] = useStateValue();
  const [todo, setTodo] = useState('');
  const handleSubmit = async evt => {
    evt.preventDefault();
    if (todo) {
      let t = { title: todo, isCompleted: false, createdAt: new Date() };
      t.id = await TodoStore.todos.add(t);
      dispatch({ type: 'ADD_TODO', payload: t });
      setTodo('');
    }
  };
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <h3>Todos</h3>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              className="full-width"
              label="What's next?"
              value={todo}
              name="todo"
              onChange={e => setTodo(e.target.value)}
              variant="outlined"
            />
          </form>
          <List>
            {todos
              .filter(t => !t.isDeleted)
              .map(t => (
                <TodoItem todo={t}></TodoItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </React.Fragment>
  );
  // return <div>Hi</div>;
};

export default TodoList;
