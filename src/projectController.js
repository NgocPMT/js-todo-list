import generateProject from "./project";

const projectController = (function () {
  const projects = [generateProject("default")];

  const createProject = (name) => {
    projects.push(generateProject(name));
  };

  const pushTodo = (todo) => {
    const addingProject = projects.find(
      (project) => project.name === todo.getProjectName()
    );

    if (addingProject) {
      addingProject.todos.push(todo);
    }
  };

  const deleteProject = (name) => {
    const deletingProject = projects.find((project) => (project.name = name));

    if (deletingProject) {
      projects.splice(projects.indexOf(deletingProject), 1);
    }
  };

  return { projects, createProject, pushTodo, deleteProject };
})();

export default projectController;
