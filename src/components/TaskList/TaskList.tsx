import { useState } from "react";
import type {
  Order,
  sortCategory,
  sortParameters,
  Task,
  TaskListProps,
} from "../../types";
import { filterItems, searchTasks, sortTasks } from "../../utils/taskUtils";
import TaskItem from "./TaskItem";
import {
  ArrowsUpDownIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/16/solid";

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

  //creates display list through 3 steps => filter => search => sort
  const displayList = (taskList: Task[]) => {
    const filteredList = filterItems(filters, taskList);
    const searchList = searchTasks(filteredList, search);
    return sortTasks(searchList, sort.category, sort.order);
  };

  //handles sorting and sets sort state
  const handleSort = (sortCategory: sortCategory) => {
    let newOrder: Order;
    if (sortCategory === sort.category) {
      switch (sort.order) {
        case "None":
          newOrder = "Asc";
          break;
        case "Asc":
          newOrder = "Desc";
          break;
        default:
          newOrder = "None";
      }
    } else {
      newOrder = "Asc";
    }
    setSort({
      category: sortCategory,
      order: newOrder,
    });
  };

  //sort icons
  const sortIcon = (headerName: string) => {
    if (headerName !== sort.category) return <ArrowsUpDownIcon className="w-4 h-4" />
    switch (sort.order) {
      case "Asc":
        return <BarsArrowUpIcon className="w-4 h-4"/>;
      case "Desc":
        return <BarsArrowDownIcon className="w-4 h-4"/>;
      default:
        return <ArrowsUpDownIcon className="w-4 h-4"/>;
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name {sortIcon("name")}</th>
            <th onClick={() => handleSort("category")}>Category {sortIcon("category")}</th>
            <th onClick={() => handleSort("priority")}>Priority {sortIcon("priority")}</th>
            <th onClick={() => handleSort("dueDate")}>Due Date {sortIcon("dueDate")}</th>
            <th onClick={() => handleSort("status")}>Status {sortIcon("status")}</th>
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
