import { Task } from "../types/Types";

//Singleton Pattern
const TaskManager = (() => {
    let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  
    const saveTasksToLocalStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const getTasks = (): Task[] => tasks;
  
    const addTask = (task: Task): void => {
      tasks.push(task);
      saveTasksToLocalStorage();
    };
  
    const updateTask = (updatedTask: Task): void => {
      const index = tasks.findIndex(task => task.title === updatedTask.title);
      if (index !== -1) {
        tasks[index] = updatedTask;
        saveTasksToLocalStorage();
      }
    };
  
    const deleteTask = (taskToDelete: Task): void => {
      tasks = tasks.filter(task => task.title !== taskToDelete.title);
      saveTasksToLocalStorage();
    };
  
    const toggleTaskCompletion = (taskToToggle: Task): void => {
      const index = tasks.findIndex(task => task.title === taskToToggle.title);
      if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToLocalStorage();
      }
    };
  
    return {
      getTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion
    };
  })();
  
  export default TaskManager;
  