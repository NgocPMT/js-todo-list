import projectController from "./projectController";
import todoController from "./todoController";

const displayController = (function () {
  const renderTodos = () => {
    const root = document.querySelector("#main-content");

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

    root.innerHTML = content;
  };

  return { renderTodos };
})();

export default displayController;
