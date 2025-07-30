import { useState } from "react";
import type { Order, sortCategory, sortParameters, Task, TaskListProps } from "../../types";
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

  const handleSort = (sortCategory: sortCategory) => {
    let newOrder: Order;
    if (sortCategory===sort.category) {
    switch (sort.order) {
      case "None":
        newOrder = "Asc"
        break;
      case "Asc":
        newOrder = "Desc"
        break;
      default:
        newOrder = "None"
    }
  }
  else {
    newOrder = "Asc"
  }
  setSort({
    category: sortCategory,
    order: newOrder
  })

  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("priority")}>Priority</th>
            <th onClick={() => handleSort("dueDate")}>Due Date</th>
            <th onClick={() => handleSort("status")}>Status</th>
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
