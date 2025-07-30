import type { Task, TaskListProps } from "../../types";
import { filterItems } from "../../utils/taskUtils";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit, onStatusChange, filters }: TaskListProps) {
  
  const filteredList = (taskList: Task[]) => filterItems(filters, taskList)
  
  
  return (
    <ul>
      {!tasks[0] && <p>No tasks match your search/filter</p>}

      
      {filteredList(tasks).map((task) => {
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
