import type { Status, Task, TaskProps } from "../../types";
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
    <tr>
      <td>{task.name}</td>
      <td>{task.category}</td>
      <td>{task.priority}</td>
      <td>{dateToString(task.dueDate)}</td>
      <td>
        <select value={task.status} onChange={handleChangeStatus}>
          {statusDropdown()}
        </select>
      </td>
      <td>
        <button onClick={() => handleEdit(task)}>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(task.id)}>Del</button>
      </td>
    </tr>
  );
}
