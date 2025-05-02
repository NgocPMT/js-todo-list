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
              <button class="todo-info" data-uid=${todo.getUID()} data-title="${todo.getTitle()}" data-due-date="${todo.getDueDate()}" data-priority="${todo.getPriority()}">Task Information</button>
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

  const renderTodayTodos = () => {
    const todos = todoController.getTodayTodos();

    const todayTodos =
      todos.length === 0
        ? `<p class="no-task-announce">There are no tasks yet...</p>`
        : todos
            .map(
              (todo) => `
          <div class="todo">
            <button class="todo-details" data-uid=${todo.getUID()}><img src=${detailIconVert} aria-label="more"/></button>
            <div class="todo-dropdown hidden" data-uid=${todo.getUID()}>
              <button class="todo-info" data-uid=${todo.getUID()} data-title="${todo.getTitle()}" data-due-date="${todo.getDueDate()}" data-priority="${todo.getPriority()}">Task Information</button>
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
    const mainContent = document.querySelector("#main-content");

    mainContent.innerHTML = `
      <div class="project">
          <div class="project-title-wrapper">
            <h2 class="project-title">Today Tasks</h2>
          </div>  
          <hr/>
          <div class="todo-container">
            ${todayTodos}
          </div>
      </div>
    `;

    addTaskDetailsEventListeners();
  };

  const renderUpcomingTodos = () => {
    const todos = todoController.getUpcomingTodos();

    const upcomingTodos =
      todos.length === 0
        ? `<p class="no-task-announce">There are no tasks yet...</p>`
        : todos
            .map(
              (todo) => `
          <div class="todo">
            <button class="todo-details" data-uid=${todo.getUID()}><img src=${detailIconVert} aria-label="more"/></button>
            <div class="todo-dropdown hidden" data-uid=${todo.getUID()}>
              <button class="todo-info" data-uid=${todo.getUID()} data-title="${todo.getTitle()}" data-due-date="${todo.getDueDate()}" data-priority="${todo.getPriority()}">Task Information</button>
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
    const mainContent = document.querySelector("#main-content");

    mainContent.innerHTML = `
      <div class="project">
          <div class="project-title-wrapper">
            <h2 class="project-title">Upcoming Tasks</h2>
          </div>  
          <hr/>
          <div class="todo-container">
            ${upcomingTodos}
          </div>
      </div>
    `;

    addTaskDetailsEventListeners();
  };

  const renderProject = (title) => {
    const mainContent = document.querySelector("#main-content");
    const projects = projectController.getProjects();
    const renderingProject = projects.find(
      (project) => project.title === title
    );

    let content = "";

    if (renderingProject.todos.length === 0) {
      content = `
        <div class="project">
          <div class="project-title-wrapper">
            <h2 class="project-title">${renderingProject.title}</h2>
            <button class="project-detail" data-title=${renderingProject.title}>
              <img src=${detailIcon} aria-label="more"/>
            </button>
            <div class="project-dropdown hidden" data-title=${renderingProject.title}>
              <button class="delete-project" data-title=${renderingProject.title}>Delete Project</button>
            </div>
          </div>  
          <hr/>
          <p class="no-task-announce">There are no tasks yet...</p>
        </div>
          `;
    } else {
      const projectTodos = renderingProject.todos
        .map(
          (todo) => `
          <div class="todo">
            <button class="todo-details" data-uid=${todo.getUID()}><img src=${detailIconVert} aria-label="more"/></button>
            <div class="todo-dropdown hidden" data-uid=${todo.getUID()}>
              <button class="todo-info" data-uid=${todo.getUID()} data-title="${todo.getTitle()}" data-due-date="${todo.getDueDate()}" data-priority="${todo.getPriority()}">Task Information</button>
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
      content = `
        <div class="project">
          <div class="project-title-wrapper">
            <h2 class="project-title">${renderingProject.title}</h2>
            <button class="project-detail" data-title=${renderingProject.title}>
              <img src=${detailIcon} aria-label="more"/>
            </button>
            <div class="project-dropdown hidden" data-title=${renderingProject.title}>
              <button class="delete-project" data-title=${renderingProject.title}>Delete Project</button>
            </div>
          </div>
          <hr/>
          <div class="todo-container">
            ${projectTodos}
          </div>
        </div>
      `;
    }
    mainContent.innerHTML = content;
    addProjectDetailsEventListeners();
    addTaskDetailsEventListeners();
  };

  const renderSidebarProjects = () => {
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
        <button class="project-filter" data-title="${project.title}">
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
    addProjectFilterEventListeners();
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
      renderSidebarProjects();
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
        const title = button.dataset.title;

        const deletionConfirmDialog =
          document.querySelector("#deletion-confirm");

        deletionConfirmDialog.innerHTML = `
          <p class="deletion-confirm">Do you really want to delete this project?</p>
          <div class="deletion-buttons">
            <button class="deletion-no">No</button>
            <button class="deletion-yes">Yes</button>
          </div>
        `;

        const noButton = document.querySelector(".deletion-no");
        const yesButton = document.querySelector(".deletion-yes");

        noButton.addEventListener("click", () => {
          deletionConfirmDialog.innerHTML = "";
          deletionConfirmDialog.close();
        });

        yesButton.addEventListener("click", () => {
          projectController.deleteProject(title);
          deletionConfirmDialog.innerHTML = "";
          deletionConfirmDialog.close();
          renderTodos();
          renderSidebarProjects();
        });

        deletionConfirmDialog.showModal();
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
    const infoButtons = document.querySelectorAll(".todo-info");
    const deleteButtons = document.querySelectorAll(".todo-delete");

    detailButtons.forEach((button) => {
      button.addEventListener("click", () => {
        taskDropdowns.forEach((dropdown) => {
          const taskUID = button.dataset.uid;
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

    infoButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const title = button.dataset.title;
        const dueDate = button.dataset.dueDate;
        const priority = button.dataset.priority;

        const taskInfoDialog = document.querySelector("dialog#task-info");

        taskInfoDialog.innerHTML = `
        <h3 class="task-info-title">${title}</h3>
        <p class="task-info-due-date">Due Date: ${dueDate}</p>
        <p class="task-info-priority">Priority: ${priority}</p>
        <button class="task-info-close">Close</button>
      `;

        const closeButton = document.querySelector(".task-info-close");
        closeButton.addEventListener("click", () => {
          taskInfoDialog.innerHTML = "";
          taskInfoDialog.close();
        });

        taskInfoDialog.showModal();
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const UID = button.dataset.uid;
        console.log(UID);

        const deletionConfirmDialog =
          document.querySelector("#deletion-confirm");

        deletionConfirmDialog.innerHTML = `
          <p class="deletion-confirm">Do you really want to delete this task?</p>
          <div class="deletion-buttons">
            <button class="deletion-no">No</button>
            <button class="deletion-yes">Yes</button>
          </div>
        `;

        const noButton = document.querySelector(".deletion-no");
        const yesButton = document.querySelector(".deletion-yes");

        noButton.addEventListener("click", () => {
          deletionConfirmDialog.innerHTML = "";
          deletionConfirmDialog.close();
        });

        yesButton.addEventListener("click", () => {
          todoController.deleteTodo(UID);
          projectController.deleteTodo(UID);
          deletionConfirmDialog.innerHTML = "";
          deletionConfirmDialog.close();
          renderTodos();
        });

        deletionConfirmDialog.showModal();
      });
    });
  };

  const addFilterEventListeners = () => {
    const todayFilter = document.querySelector("#today-filter");
    const upcomingFilter = document.querySelector("#upcoming-filter");
    const anytimeFilter = document.querySelector("#anytime-filter");

    todayFilter.addEventListener("click", () => renderTodayTodos());
    upcomingFilter.addEventListener("click", () => renderUpcomingTodos());
    anytimeFilter.addEventListener("click", () => renderTodos());
  };

  const addProjectFilterEventListeners = () => {
    const projectFilters = document.querySelectorAll(".project-filter");

    projectFilters.forEach((projectFilter) => {
      projectFilter.addEventListener("click", () => {
        const title = projectFilter.dataset.title;
        renderProject(title);
      });
    });
  };

  return {
    renderTodos,
    renderSidebarProjects,
    addNewProjectEventListeners,
    addNewTaskEventListeners,
    addFilterEventListeners,
  };
})();

export default displayController;
