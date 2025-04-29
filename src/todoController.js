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

  return { createTodo, getTodos };
})();

export default todoController;
