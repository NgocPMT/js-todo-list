export default function generateTodo(state) {
  const _state = { ...state };

  return {
    getTitle: () => _state.title,

    setTitle: (newTitle) => {
      _state.title = newTitle;
    },

    getDueDate: () => _state.dueDate,

    setDueDate: (newDueDate) => {
      _state.dueDate = newDueDate;
    },

    getPriority: () => _state.priority,

    setPriority: (newPriority) => {
      _state.priority = newPriority;
    },

    getProjectName: () => _state.projectName,

    setProjectName: (newProjectName) => {
      _state.projectName = newProjectName;
    },

    getChecked: () => _state.checked,

    setChecked: (newChecked) => {
      _state.checked = newChecked;
    },
  };
}
