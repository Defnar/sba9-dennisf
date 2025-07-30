import type { Priority, Status, Task, TaskProps } from "../../types";
import { dateToString } from "../../utils/taskUtils";

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
        return "text-green-700 flex flex-row justify-center";
      case "Medium":
        return "text-black flex flex-row justify-center";
      case "High":
        return "text-red-500 flex flex-row justify-center";
      default:
        return "";
    }
  };

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
    <tr className="h-12 border-t border-gray-300">
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
          <select value={task.status} onChange={handleChangeStatus}>
            {statusDropdown()}
          </select>
        </span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          <button onClick={() => handleEdit(task)}>Edit</button>
        </span>
      </td>
      <td>
        <span className="flex flex-row justify-center">
          <button
            className="text-red-500"
            onClick={() => handleDelete(task.id)}
          >
            Del
          </button>
        </span>
      </td>
    </tr>
  );
}
