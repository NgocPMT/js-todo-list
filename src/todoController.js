import generateTodo from "./todo";
import projectController from "./projectController";
import { format, compareAsc } from "date-fns";

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

  const getTodayTodos = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const todayTodos = todos.filter((todo) => todo.getDueDate() === today);

    return todayTodos;
  };

  const getUpcomingTodos = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const upcomingTodos = todos.filter(
      (todo) => compareAsc(todo.getDueDate(), today) === 1
    );

    return upcomingTodos;
  };

  return { createTodo, getTodos, deleteTodo, getTodayTodos, getUpcomingTodos };
})();

export default todoController;
