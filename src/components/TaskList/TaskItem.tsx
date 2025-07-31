import { useEffect } from "react";
import type { Priority, Status, Task, TaskProps } from "../../types";
import { checkIfOverdue, dateToString } from "../../utils/taskUtils";

export default function TaskItem({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskProps) {
  //status list to create dropdown box

  //create dropdown list for statuses
  const statusDropdown = () => {
    const status = ["Pending", "In Progress", "Overdue", "Completed"];

    return status.map((stat) => {
      return (
        <option value={stat} key={stat}>
          {stat}
        </option>
      );
    });
  };

  const setPriorityStyle = (priority: Priority): string => {
    switch (priority) {
      case "Low":
        return "text-green-700 dark:text-green-400 flex flex-row justify-center";
      case "Medium":
        return "text-black dark:text-white flex flex-row justify-center";
      case "High":
        return "text-red-500 dark:text-red-400 flex flex-row justify-center";
      default:
        return "";
    }
  };

  const checkOverdue = () => {
    if (task.status == "Pending" || task.status == "In Progress") {
      if (checkIfOverdue(task.dueDate)) onStatusChange(task.id, "Overdue");
    }
  };

  //use effect and set interval are cool.  I hope we learn more about these in class
  //I think it'll be helpful so I don't overload the browser with checking the conditional
  //like I just did.  quick fix from vscode for removing line
  //these check overdue on a timer, and on editing the due date for the task
  useEffect(() => {
    const interval = setInterval(() => checkOverdue(), 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  useEffect(
    () =>
      checkOverdue(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [task]
  );
  //passes task id into callback functions for changing status, handling
  const handleDelete = (taskId: number) => {
    onDelete(taskId);
  };

  const handleEdit = (task: Task) => {
    onEdit(task);
  };

  //callback function for handling status
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, event.target.value as Status);
  };

  return (
    <tr className="h-12 border-t border-gray-600">
      <td>
        <span className="flex flex-row justify-center">{task.name}</span>
      </td>
      <td>
        <span className="flex flex-row justify-center">{task.category}</span>
      </td>
      <td>
        <span className={setPriorityStyle(task.priority)}>{task.priority}</span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          {dateToString(task.dueDate)}
        </span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          <select value={task.status} onChange={handleChangeStatus} className="bg-white dark:bg-slate-700 hover:bg-slate-600 shadow-sm rounded-sm hover:bg-blue-300">
            {statusDropdown()}
          </select>
        </span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          <button className="text-blue-800 dark:text-blue-200 hover:cursor-pointer" onClick={() => handleEdit(task)}>Edit</button>
        </span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          <button
            className="text-red-500 dark:text-red-400 hover:cursor-pointer"
            onClick={() => handleDelete(task.id)}
          >
            Del
          </button>
        </span>
      </td>
    </tr>
  );
}
