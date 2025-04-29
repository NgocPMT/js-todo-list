import generateProject from "./project";
import generateTodo from "./todo";

const projectController = (function () {
  const projects = [];

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
