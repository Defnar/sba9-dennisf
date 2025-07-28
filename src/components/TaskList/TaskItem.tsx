import type { TaskProps } from "../../types";

export default function TaskItem({task, onDelete, onEdit}: TaskProps) {

    const handleDelete = (taskId: number)=> {
        onDelete(taskId);
    }
    
    const handleEdit = (taskId: number) => {
        onEdit(taskId);
    }

    return (
        <li>
            <div>{task.name}</div>
            <div>{task.category}</div>
            <div>{task.priority}</div>
            <div>{task.dueDate.toLocaleDateString()}</div>
            <div>{task.status}</div>
            <button onClick={() => handleEdit(task.id)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>X</button>
        </li>
    )
    

}