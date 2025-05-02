import generateTodo from "./todo";
import projectController from "./projectController";
import { format, compareAsc } from "date-fns";

const todoController = (function () {
  const getLocalTodos = () => {
    if (!localStorage.getItem("todos")) {
      return;
    }

    const localTodos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = localTodos.map((todo) => generateTodo(todo));

    return newTodos;
  };

  const todos = getLocalTodos() || [];

  const saveLocalTodos = () => {
    const localTodos = todos.map((todo) => ({
      UID: todo.getUID(),
      title: todo.getTitle(),
      dueDate: todo.getDueDate(),
      priority: todo.getPriority(),
      projectName: todo.getProjectName(),
      check: todo.getChecked(),
    }));

    localStorage.setItem("todos", JSON.stringify(localTodos));
  };

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

    saveLocalTodos();
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
    saveLocalTodos();
  };

  const getTodayTodos = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const todayTodos = getTodos().filter((todo) => todo.getDueDate() === today);

    return todayTodos;
  };

  const getUpcomingTodos = () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const upcomingTodos = getTodos().filter(
      (todo) => compareAsc(todo.getDueDate(), today) === 1
    );

    return upcomingTodos;
  };

  return { createTodo, getTodos, deleteTodo, getTodayTodos, getUpcomingTodos };
})();

export default todoController;
