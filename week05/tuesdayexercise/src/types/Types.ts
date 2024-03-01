export interface Task {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

// Factory pattern

export const createTask = (title: string, description: string, dueDate: Date): Task => {
    return {
        title,
        description,
        dueDate,
        completed: false,
    };
};
