import React, { useState } from "react";
import { Task, createTask } from "../types/Types";

interface TaskFormProps {
    onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // bruger Factory funktionen her (Factory Pattern)
        const newTask: Task = createTask(title, description, new Date(dueDate))
            
        onSubmit(newTask);
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate);
    };
    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                <label>Description: </label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                <label>Due Date: </label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;