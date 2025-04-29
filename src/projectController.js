import generateProject from "./project";

const projectController = (function () {
  const projects = [generateProject("default")];

  const createProject = (name) => {
    projects.push(generateProject(name));
  };

  const handleAddToProject = (todo) => {
    const addingProject = projects.find(
      (project) => project.name === todo.getProjectName()
    );

    if (addingProject) {
      addingProject.todos.push(todo);
    }
  };

  return { createProject, handleAddToProject, projects };
})();

export default projectController;
