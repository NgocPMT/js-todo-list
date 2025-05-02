import generateProject from "./project";
import generateTodo from "./todo";

const projectController = (function () {
  const getLocalProjects = () => {
    if (!localStorage.getItem("projects")) {
      return;
    }

    const localProjects = JSON.parse(localStorage.getItem("projects"));

    const newProjects = localProjects.map((project) => {
      const localProjectTodos = project.todos.map((todo) => generateTodo(todo));
      return { title: project.title, todos: localProjectTodos };
    });

    return newProjects;
  };

  const projects = getLocalProjects() || [generateProject("general")];

  const saveLocalProjects = () => {
    const localProjects = projects.map((project) => {
      const localProjectTodos = project.todos.map((todo) => ({
        UID: todo.getUID(),
        title: todo.getTitle(),
        dueDate: todo.getDueDate(),
        priority: todo.getPriority(),
        projectName: todo.getProjectName(),
        check: todo.getChecked(),
      }));
      return { title: project.title, todos: localProjectTodos };
    });

    localStorage.setItem("projects", JSON.stringify(localProjects));
  };

  const createProject = (title) => {
    projects.push(generateProject(title));
    saveLocalProjects();
  };

  const getProjects = () => projects;

  const pushTodo = (todo) => {
    const addingProject = projects.find(
      (project) => project.title === todo.getProjectName()
    );

    if (addingProject) {
      addingProject.todos.push(todo);
    }

    addingProject.todos.sort((t1, t2) => t1.getPriority() - t2.getPriority());
    saveLocalProjects();
  };

  const deleteProject = (title) => {
    const deletingProject = projects.find((project) => project.title === title);

    if (deletingProject) {
      projects.splice(projects.indexOf(deletingProject), 1);
    }
    saveLocalProjects();
  };

  const deleteTodo = (UID) => {
    projects.forEach((project) => {
      const deletingTodo = project.todos.find((todo) => todo.getUID() === UID);
      if (deletingTodo) {
        project.todos.splice(project.todos.indexOf(deletingTodo), 1);
        return;
      }
    });
    saveLocalProjects();
  };

  return { getProjects, createProject, pushTodo, deleteProject, deleteTodo };
})();

export default projectController;
