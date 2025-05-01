import projectController from "./projectController";
import todoController from "./todoController";
import projectIcon from "./img/current-project.svg";
import detailIcon from "./img/details.svg";

const displayController = (function () {
  const renderTodos = () => {
    const mainContent = document.querySelector("#main-content");

    const projects = projectController.getProjects();

    const content = projects
      .map((project) => {
        if (project.todos.length === 0) {
          return `
        <div class="project">
          <div class="project-title-wrapper">
            <h2 class="project-title">${project.title}</h2>
            <button class="project-detail" data-title=${project.title}>
              <img src=${detailIcon} aria-label="more"/>
            </button>
            <div class="project-dropdown hidden" data-title=${project.title}>
              <button class="delete-project" data-title=${project.title}>Delete Project</button>
            </div>
          </div>  
          <hr/>
          <p class="no-task-announce">There are no tasks yet...</p>
        </div>
          `;
        }

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
          <div class="project-title-wrapper">
            <h2 class="project-title">${project.title}</h2>
            <button class="project-detail" data-title=${project.title}>
              <img src=${detailIcon} aria-label="more"/>
            </button>
            <div class="project-dropdown hidden" data-title=${project.title}>
              <button class="delete-project" data-title=${project.title}>Delete Project</button>
            </div>
          </div>
          <hr/>
          <div class="todo-container">
            ${projectTodos}
          </div>
        </div>
      `;
      })
      .join("");

    mainContent.innerHTML = content;
    addProjectDetailsEventListeners();
  };

  const renderProjects = () => {
    const projectFilterContainer = document.querySelector(
      "#project-filter-container"
    );
    const ProjectNameSelect = document.querySelector(
      "#task-project-name-select"
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

    const projectOptions = projects.map(
      (project) => `
        <option value=${project.title}>${project.title}</option>
      `
    );

    projectFilterContainer.innerHTML = projectFilters;
    ProjectNameSelect.innerHTML = projectOptions;
  };

  const addNewProjectEventListeners = () => {
    const newProjectBtn = document.querySelector("#new-project-btn");
    const newProjectModal = document.querySelector("#new-project-modal");
    const newProjectClose = document.querySelector("#new-project-close");

    newProjectBtn.addEventListener("click", () => newProjectModal.showModal());
    newProjectClose.addEventListener("click", () => newProjectModal.close());
    newProjectModal.addEventListener("submit", (event) => {
      event.preventDefault();

      const projectTitle = document.querySelector("#project-title").value;

      projectController.createProject(projectTitle);
      renderProjects();
      renderTodos();
      newProjectModal.close();
    });
  };

  const addProjectDetailsEventListeners = () => {
    const detailButtons = document.querySelectorAll(".project-detail");
    const deleteButtons = document.querySelectorAll(".delete-project");
    const projectDropdowns = document.querySelectorAll(".project-dropdown");

    detailButtons.forEach((button) => {
      button.addEventListener("click", () => {
        projectDropdowns.forEach((dropdown) => {
          if (dropdown.dataset.title === button.dataset.title) {
            if (dropdown.classList.contains("hidden")) {
              dropdown.classList.remove("hidden");
            } else {
              dropdown.classList.add("hidden");
            }
          }
        });
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const projectTitle = button.dataset.title;
        projectController.deleteProject(projectTitle);
        renderTodos();
        renderProjects();
      });
    });
  };

  const addNewTaskEventListeners = () => {
    const newTaskModal = document.querySelector("#new-task-modal");
    const newTaskBtn = document.querySelector("#new-todo-btn");
    const newTaskClose = document.querySelector("#new-task-close");
    const newTaskForm = document.querySelector("#new-task-form");

    newTaskBtn.addEventListener("click", () => {
      newTaskModal.showModal();
    });

    newTaskClose.addEventListener("click", () => {
      newTaskModal.close();
    });
  };

  return {
    renderTodos,
    renderProjects,
    addNewProjectEventListeners,
    addNewTaskEventListeners,
  };
})();

export default displayController;
