import generateProject from "./project";

const projectController = (function () {
  const projects = [generateProject("general")];

  const createProject = (title) => {
    projects.push(generateProject(title));
  };

  const getProjects = () => projects;

  const pushTodo = (todo) => {
    const addingProject = projects.find(
      (project) => project.title === todo.getProjectName()
    );

    if (addingProject) {
      addingProject.todos.push(todo);
    }
  };

  const deleteProject = (title) => {
    const deletingProject = projects.find((project) => (project.title = title));

    if (deletingProject) {
      projects.splice(projects.indexOf(deletingProject), 1);
    }
  };

  return { getProjects, createProject, pushTodo, deleteProject };
})();

export default projectController;
