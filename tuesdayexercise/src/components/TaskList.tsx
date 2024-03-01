import React, { useState } from "react";
import { Task } from "../types/Types";
import './TaskList.css'; 

interface TaskListProps {
    tasks: Task[],
    editTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
    toggleTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editTask, deleteTask, toggleTask}) => {
    const [editedTask, setEditedTask] = useState<Task | null>(null);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedTask) {
            const updatedTask: Task = { ...editedTask, title: e.target.value };
            setEditedTask(updatedTask);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedTask) {
            const updatedTask: Task = { ...editedTask, description: e.target.value };
            setEditedTask(updatedTask);
        }
    };

    const handleEditSubmit = () => {
        if (editedTask) {
            editTask(editedTask);
            setEditedTask(null);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.title} className="task-item">
                        <div className="task-content">
                            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} />
                            {editedTask === task ? (
                                <>
                                    <input type="text" value={editedTask.title} onChange={handleEditChange} />
                                    <input type="text" value={editedTask.description} onChange={handleDescriptionChange} />
                                    <button onClick={handleEditSubmit}>Save</button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <span>{task.title}</span>
                                    </div>
                                    <div>
                                        <span>{task.description}</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="button-container">
                            <button onClick={() => editTask(task)}>Edit</button>
                            <button onClick={() => deleteTask(task)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
