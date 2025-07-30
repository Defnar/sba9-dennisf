import { useState } from "react";
import type { sortParameters, Task, TaskListProps } from "../../types";
import { filterItems, searchTasks, sortTasks } from "../../utils/taskUtils";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  search,
  filters,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskListProps) {
  const [sort, setSort] = useState<sortParameters>({
    category: "name",
    order: "None",
  });

  const displayList = (taskList: Task[]) => {
    const filteredList = filterItems(filters, taskList);
    const searchList = searchTasks(filteredList, search);
    return sortTasks(searchList, sort.category, sort.order);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>

      {!tasks[0] && <p>No tasks match your search/filter</p>}
    </>
  );
}
