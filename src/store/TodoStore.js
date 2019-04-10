import Dexie from 'dexie';

const TodoStore = new Dexie('TodoStore');

TodoStore.version(1).stores({
  todos: '++id, todo, isCompleted, createdAt, deletedAt',
  user: '++id, fullName'
});

export default TodoStore;
