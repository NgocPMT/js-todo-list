import projectController from "./projectController";
import todoController from "./todoController";

const displayController = (function () {
  const renderTodos = () => {
    const root = document.querySelector("#root");

    const todos = todoController.getTodos();
    todos.forEach((todo) => {
      projectController.pushTodo(todo);
    });

    const projects = projectController.getProjects();

    const content = projects
      .map((project) => {
        const projectTodos = project.todos
          .map(
            (todo) => `
          <div class="todo">
            <p class="todo-title">${todo.getTitle()}</p>
          </div>
        `
          )
          .join("");
        return `
        <div class="project">
          <h2 class="project-title">${project.title}</h2>
          <div class="todo-container">
            ${projectTodos}
          </div>
        </div>
      `;
      })
      .join("");

    root.innerHTML = content;
  };

  return { renderTodos };
})();

export default displayController;
