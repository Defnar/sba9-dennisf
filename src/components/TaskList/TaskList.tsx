import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

export default function TaskList({tasks, onDelete, onEdit}: TaskListProps) {
    return (
        <TaskItem />
    )
}