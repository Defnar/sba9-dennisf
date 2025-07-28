import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit, onStatusChange }: TaskListProps) {
  return (
    <ul>
      {!tasks[0] && <p>No tasks match your search/filter</p>}

      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </ul>
  );
}
