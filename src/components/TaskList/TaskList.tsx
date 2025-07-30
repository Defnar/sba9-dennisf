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
    if (headerName !== sort.category)
      return <ArrowsUpDownIcon className="w-4 h-4" />;
    switch (sort.order) {
      case "Asc":
        return <BarsArrowUpIcon className="w-4 h-4" />;
      case "Desc":
        return <BarsArrowDownIcon className="w-4 h-4" />;
      default:
        return <ArrowsUpDownIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-blue-50 rounded-md">
      <table className="table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-3xs rounded-md h-1.5 hover:bg-blue-400 hover:cursor-pointer" onClick={() => handleSort("name")}>
              <span className="flex flex-row justify-center">
                Name {sortIcon("name")}
              </span>
            </th>
            <th className="w-3x rounded-md h-1.5  hover:bg-blue-400 hover:cursor-pointer" onClick={() => handleSort("category")}>
              <span className="flex flex-row justify-center">
                Category {sortIcon("category")}
              </span>
            </th>
            <th className="w-3xs rounded-md h-1.5 hover:bg-blue-400 hover:cursor-pointer" onClick={() => handleSort("priority")}>
              <span className="flex flex-row justify-center">
                Priority {sortIcon("priority")}
              </span>
            </th>
            <th className="w-3xs rounded-md h-1.5 hover:bg-blue-400 hover:cursor-pointer" onClick={() => handleSort("dueDate")}>
              <span className="flex flex-row justify-center">
                Due Date {sortIcon("dueDate")}
              </span>
            </th>
            <th className="w-3xs rounded-md h-1.5 hover:bg-blue-400 hover:cursor-pointer" onClick={() => handleSort("status")}>
              <span className="flex flex-row justify-center">
                Status {sortIcon("status")}
              </span>
            </th>
            <th className="w-10">Edit</th>
            <th className="w-10">Del</th>
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
    </div>
  );
}
