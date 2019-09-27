import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { StateProvider } from './context/StateProvider';
import TodoStore from './store/TodoStore';

const App = () => {
  const [state, setState] = useState(null);
  let reducer = (state, action) => {
    let idx, todos, todo;
    switch (action.type) {
      case 'ADD_TODO':
        todo = action.payload;
        todo.isCompleted = false;
        return {
          ...state,
          todos: [...state.todos, todo]
        };
      case 'DELETE_TODO':
        todos = state.todos;
        idx = todos.indexOf(action.payload);
        if (idx > -1) {
          todos.splice(idx, 1);
        }
        return { ...state, todos };
      case 'TOGGLE_TODO':
        todos = state.todos;
        idx = todos.indexOf(action.payload);
        if (idx > -1) {
          todos[idx].isCompleted = !todos[idx].isCompleted;
          todos[idx].completedAt = todos[idx].isCompleted
            ? (todos[idx].completedAt = new Date())
            : null;
        }
        return { ...state, todos };
      case 'EDIT_TODO':
        todos = state.todos;
        idx = todos.map(x => x.id).indexOf(action.payload.id);
        todos[idx] = action.payload;
        return { ...state, todos };
      default:
        break;
    }
  };

  useEffect(() => {
    async function loadState() {
      let t = await TodoStore.todos.toArray();
      setState({ todos: t });
    }
    loadState();
  }, []);

  return state ? (
    <StateProvider initialState={state} reducer={reducer}>
      <TodoList />
    </StateProvider>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
