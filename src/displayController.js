import projectController from "./projectController";
import todoController from "./todoController";
import projectIcon from "./img/current-project.svg";

const displayController = (function () {
  const renderTodos = () => {
    const mainContent = document.querySelector("#main-content");

    const projects = projectController.getProjects();

    const content = projects
      .map((project) => {
        const projectTodos = project.todos
          .map(
            (todo) => `
          <div class="todo">
            <label for="todo-${todo.getUID()}-check" class="todo-title">
              <input id="todo-${todo.getUID()}-check" type="checkbox" name="todo-check" data-uid=${todo.getUID()}/>
              ${todo.getTitle()}
            </label>
          </div>
        `
          )
          .join("");
        return `
        <div class="project">
          <h2 class="project-title">${project.title}</h2>
          <hr/>
          <div class="todo-container">
            ${projectTodos}
          </div>
        </div>
      `;
      })
      .join("");

    mainContent.innerHTML = content;
  };

  const renderProjects = () => {
    const projectFilterContainer = document.querySelector(
      "#project-filter-container"
    );

    const projects = projectController.getProjects();

    const projectFilters = projects
      .map(
        (project) => `
        <button data-title="${project.title}">
            <span class="filter-content"
              ><img src=${projectIcon} alt="" />${project.title}</span
            >
        </button>
      `
      )
      .join("");

    projectFilterContainer.innerHTML = projectFilters;
  };

  return { renderTodos, renderProjects };
})();

export default displayController;
