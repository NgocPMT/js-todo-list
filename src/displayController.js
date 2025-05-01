import projectController from "./projectController";
import todoController from "./todoController";
import projectIcon from "./img/current-project.svg";
import detailIcon from "./img/details.svg";
import detailIconVert from "./img/details-vert.svg";

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
            <button class="todo-details" data-uid=${todo.getUID()}><img src=${detailIconVert} aria-label="more"/></button>
            <div class="todo-dropdown hidden" data-uid=${todo.getUID()}>
              <button class="todo-info" data-uid=${todo.getUID()}>Task Information</button>
              <button class="todo-delete" data-uid=${todo.getUID()}>Delete Task</button>
            </div>
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
    addTaskDetailsEventListeners();
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
    const newProjectForm = document.querySelector("#new-project-form");

    newProjectBtn.addEventListener("click", () => newProjectModal.showModal());
    newProjectClose.addEventListener("click", () => newProjectModal.close());
    newProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const projectTitle = document.querySelector("#project-title").value;

      projectController.createProject(projectTitle);
      renderProjects();
      renderTodos();
      newProjectForm.reset();
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
          if (
            dropdown.classList.contains("hidden") &&
            dropdown.dataset.title === button.dataset.title
          ) {
            dropdown.classList.remove("hidden");
          } else {
            dropdown.classList.add("hidden");
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

    newTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskTitle = document.querySelector("#task-title").value;
      const taskDueDate = document.querySelector("#task-due-date").value;
      const taskPriority = document.querySelector("#task-priority").value;
      const taskProjectName = document.querySelector(
        "#task-project-name-select"
      ).value;

      todoController.createTodo(
        taskTitle,
        taskDueDate,
        taskPriority,
        taskProjectName
      );

      renderTodos();

      newTaskForm.reset();
      newTaskModal.close();
    });
  };

  const addTaskDetailsEventListeners = () => {
    const detailButtons = document.querySelectorAll(".todo-details");
    const taskDropdowns = document.querySelectorAll(".todo-dropdown");

    detailButtons.forEach((button) => {
      button.addEventListener("click", () => {
        taskDropdowns.forEach((dropdown) => {
          let taskUID = button.dataset.uid;
          if (
            dropdown.classList.contains("hidden") &&
            dropdown.dataset.uid === taskUID
          ) {
            dropdown.classList.remove("hidden");
          } else {
            dropdown.classList.add("hidden");
          }
        });
      });
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
