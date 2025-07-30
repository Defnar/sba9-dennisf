import type { Task, TaskListProps } from "../../types";
import { filterItems, searchTasks } from "../../utils/taskUtils";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  search,
  filters,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskListProps) {
  const displayList = (taskList: Task[]) => {
    const filteredList = filterItems(filters, taskList);
    return searchTasks(filteredList, search);
  };

  return (
    <ul>
      {!tasks[0] && <p>No tasks match your search/filter</p>}

      {displayList(tasks).map((task) => {
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
