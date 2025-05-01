import generateTodo from "./todo";
import projectController from "./projectController";

const todoController = (function () {
  const todos = [];

  const createTodo = (title, dueDate, priority, projectName) => {
    const newTodo = generateTodo({
      UID: crypto.randomUUID(),
      title,
      dueDate,
      priority,
      projectName,
      checked: false,
    });

    todos.push(newTodo);

    projectController.pushTodo(newTodo);
  };

  const getTodos = () => {
    const sortedTodos = [...todos];

    sortedTodos.sort((t1, t2) => t1.getPriority() - t2.getPriority());

    return sortedTodos;
  };

  const deleteTodo = (UID) => {
    const deletingTodo = todos.find((todo) => todo.getUID() === UID);
    if (deletingTodo) {
      todos.splice(todos.indexOf(deletingTodo), 1);
    }
  };

  return { createTodo, getTodos, deleteTodo };
})();

export default todoController;
