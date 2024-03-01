import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskManager from './services/TaskManager';
import { Task } from './types/Types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(TaskManager.getTasks());

  const addTask = (task: Task) => {
    TaskManager.addTask(task);
    setTasks([...TaskManager.getTasks()]);
  };

  const editTask = (editedTask: Task) => {
    TaskManager.updateTask(editedTask);
    setTasks([...TaskManager.getTasks()]);
  };

  const deleteTask = (taskToDelete: Task) => {
    TaskManager.deleteTask(taskToDelete);
    setTasks([...TaskManager.getTasks()]);
  };

  const toggleTask = (taskToToggle: Task) => {
    TaskManager.toggleTaskCompletion(taskToToggle);
    setTasks([...TaskManager.getTasks()]); 
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-form-container">
        <TaskForm onSubmit={addTask} />
      </div>
      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      </div>
    </div>
  );
}

export default App;
