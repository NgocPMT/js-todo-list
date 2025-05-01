import "./css/style.css";
import todoController from "./todoController";
import displayController from "./displayController";

todoController.createTodo("Buy groceries", "2025-05-01", 2, "general", false);
todoController.createTodo(
  "Finish project report",
  "2025-05-03",
  1,
  "general",
  false
);
todoController.createTodo("Call plumber", "2025-04-30", 3, "general", true);
todoController.createTodo(
  "Book flight tickets",
  "2025-05-05",
  2,
  "general",
  false
);
todoController.createTodo(
  "Submit tax documents",
  "2025-04-29",
  1,
  "general",
  true
);

console.log(todoController.getTodos());
displayController.renderTodos();
displayController.renderProjects();
displayController.addNewProjectEventListeners();
displayController.addNewTaskEventListeners();
