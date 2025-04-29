import generateTodo from "./todo";

const todoController = (function () {
  const todos = [];

  const createTodo = (title, dueDate, priority, projectName, checked) => {
    todos.push(
      generateTodo({ title, dueDate, priority, projectName, checked })
    );
  };

  const getTodos = () => {
    const sortedTodos = [...todos];

    sortedTodos.sort((t1, t2) => t1.priority - t2.priority);

    return sortedTodos;
  };

  const deleteTodo = (UID) => {
    const deletingTodo = todos.find((todo) => (todo.UID = UID));

    if (deletingTodo) {
      todos.splice(todos.indexOf(deletingTodo), 1);
    }
  };

  return { createTodo, getTodos, deleteTodo };
})();

export default todoController;
